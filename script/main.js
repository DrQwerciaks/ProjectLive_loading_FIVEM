let audio = new Audio();
var request = new XMLHttpRequest();
var count = 0;
function Main(){
    
    return{
        DiscordGuildId: '1118631285120839710', // Also know as Discord server ID
        DiscordInviteLink: 'https://discord.gg/MYXUfXhyra',
        memberCount: 0,
        musicAutoplay: true, // Set this to true if you want the music to autoplay
        musicVolume: 0.1, // Set the volume that you like (0 = 0% ; 0.5 = 50% ; 1 = 100%)
        buttons:[
            {label: 'Home', selected: true},
        ],
        musicList: [
            {label: 'Muza z wideo',author: 'DrQwerciak',src: 'audio/video.mp3'},
            {label: 'Won’t Forget You',author: 'Shouse',src: 'audio/wont_forget_you.mp3'},
            {label: 'Dive Too Deep',author: 'Deanz feat. Revel Day',src: 'audio/dive_too_deep.mp3'},
            {label: 'Habits (Stay High)',author: 'Tove Lo',src: 'audio/habits.mp3'},
        ],
        team:[
            {discord: 'cwel#8040', role: 'Project Leader', img: 'img/member.png'},
            {discord: 'cwel#3752', role: 'Head-Developer', img: 'img/member1.png'},
        ],
        // No touching here!!!!
        isMusicPlaying: false,
        musicOpen: false,
        currentSong: 0,
        listen(){
            if(this.musicAutoplay){
                setTimeout(() => { this.play();}, 100);
            }
            request.open('GET', 'https://discordapp.com/api/guilds/'+this.DiscordGuildId+'/widget.json', true);
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                count = data.presence_count;
            }
            };    
            request.onerror = function() {
            };
            request.send();   
            setTimeout(() => { this.memberCount = count; }, 1000);
        },
        selectBtn(select){
            this.buttons.forEach(function(button){
                button.selected = false;
            });
            return true;
        },
        play(){
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            audio.volume = this.musicVolume;
            this.isMusicPlaying = true;
        },
        pause(){
            audio.pause()
            this.isMusicPlaying = false;
        },
        next(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong < this.musicList.length-1){
                this.currentSong++;
            }else{
                this.currentSong = 0;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
        prev(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong != 0){
                this.currentSong = this.currentSong-1;
            }else{
                this.currentSong = this.musicList.length-1;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
    }
}
