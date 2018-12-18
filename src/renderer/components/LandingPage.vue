<template>
  <div id="wrapper">
    <br>
    <input type="text" style="width: 100%;" @change="checkURL" v-model="url" class="form-control " placeholder="URL" />
    <br>
    <div v-if="name != '' "> {{ name }}</div>
    <div v-else >Video title</div>

    <br>
    <div class="progress" style="height: 25px;">
      <div class="progress-bar" v-bind:class="{ 'progress-bar-striped': converting , 'progress-bar-animated': converting }" v-bind:style="{width: percent + '%'}" style="height: 100%;">
         <span v-if="!converting" class="font-weight-bold">{{ percent }} % </span>
         <span v-else class="font-weight-bold">Generating {{ audioFormat }} </span>
      </div>
      
    </div>
    
    <br>

    <div class="form-inline">
      <label for="select"><font-awesome-icon :icon="['fas', 'music']"></font-awesome-icon>&nbsp; Format </label> &nbsp;  &nbsp;
      <b-form-select v-model="audioFormat" id="select" :options="options" class="custom-select my-1 mr-sm-2" style="width: 30%" /> &nbsp;

      <button class="btn btn-hg btn-inverse" @click="download" :disabled=" downloading || directory ==''  || this.url == '' " ><font-awesome-icon icon="file-download" ></font-awesome-icon>&nbsp;Download</button> &nbsp; &nbsp;
      <button class="btn btn-hg btn-inverse" @click="folderSelect" :disabled="downloading"><font-awesome-icon icon="folder-open" ></font-awesome-icon>&nbsp;  Folder</button> 
    </div>
    <br>

    <div v-if="directory!=''" ><font-awesome-icon :icon="['far', 'folder']"></font-awesome-icon> {{directory}}</div>
    <div v-else >Select destination forder to continue</div>

    <br>
  </div>
</template>

<script>
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { remote } = require('electron')
const storage = require('electron-json-storage');

const dataPath = storage.getDataPath();
ffmpeg.setFfmpegPath(ffmpegPath);

  export default {
    name: 'landing-page',
    components: {  },
    data() {
      return {
        url: "",
        // https://www.youtube.com/watch?v=ZigwGPcsdr0
        percent: 0,
        valid: false,
        directory: "",
        downloading: false,
        formats: [],
        name: "",
        converting: false,
        audioFormat: "mp3",
        options: [
          { value: 'mp3', text: 'MP3' },
          { value: 'flac', text: 'FLAC' },
          { value: 'wav', text: 'WAV' },
          { value: 'ogg', text: 'Vorbis' },
        ]
      }
    },
    created() {
      this.checkDir()
    },
    methods: {
      folderSelect () {
        remote.dialog.showOpenDialog({
          properties: ['openDirectory'],
          // defaultPath: current
        }, names => {
          console.log('selected directory:' + names[0]);
          this.directory = names[0]
          storage.set('directory', { dir: this.directory }, function(error) {
            if (error) throw error;
          });
        });
      },
      checkURL() {
        const that = this
        this.formats = []
        if(ytdl.validateURL(this.url)){
          const info = ytdl.getInfo(this.url, (err, data) =>{
            console.log(data);
            that.name = data.title
            data.formats.forEach(format => {
              if(format.resolution)
                that.formats.push([format.container, format.resolution])
            });
          })
          
        }
      },
      checkDir() {
        const that = this
        storage.has('directory', function(error, hasKey) {
          if (error) throw error;

          if (hasKey) {
            storage.get('directory', function(error, data) {
              if (error) throw error;

              console.log(data.dir);
              that.directory = data.dir
            });
          }
        });
      },
      download (link) {
        
        this.checkURL()
        if(this.downloading || this.directory =='' || this.url == '' ){
          return
        }
        this.percent = 0
        this.downloading = true
        const that = this
        const video = ytdl(this.url, {
          quality: "highestaudio",
          filter: (format) => format.container === 'mp4'
          })

        video.pipe(fs.createWriteStream('video.mp4'))

        video.on('progress', (chunkLength, downloaded, total) => {
          this.percent = parseInt((downloaded / total) * 100)
        })
        video.on('end', () => {
          that.converting = true
          console.log(that.converting);
          
          var proc = new ffmpeg({ source: 'video.mp4', nolog: true })
          .toFormat(this.audioFormat)
          .on('end', function() {
            that.converting = false
            console.log(that.converting);
            let myNotification = new Notification('YTDX', {
              body: 'Finished downloading ➞ '+ that.name + '.' + that.audioFormat
            })

            myNotification.onclick = () => {
              console.log('Notification clicked')
              console.log(that.directory + '/'+ that.name +'.' + that.audioFormat )

              remote.shell.showItemInFolder(that.directory + '/'+ that.name +'.' + that.audioFormat);
            }

            console.log('file has been converted successfully');

            fs.stat('video.mp4', function (err, stats) {
              console.log(stats);//here we got all information of file in stats variable

              if (err) {
                  return console.error(err);
                  that.downloading = false
              }

              fs.unlink('video.mp4',function(err){
                    if(err){ 
                      that.downloading = false
                      return console.log(err);
                    }
                    console.log('file deleted successfully');
                    that.downloading = false
              });  
            });
          })
          .on('error', function(err) {
            console.log('an error happened: ' + err.message);
            this.converting = false
          })
          // save to file <-- the new file I want -->
          .saveToFile(this.directory + '/'+ this.name +'.' + this.audioFormat);

        })
      }
    }
  }
</script>

<style>

</style>
