const { createApp } = Vue;

createApp({
    data(){
        return {
            theme: 'dark',
            // count: 0,
        }
    },

    methods:{
        toggleTheme:function(){
            console.log("Theme Toggled");
            if (this.theme == 'light') {
                console.log("Light Theme!");
                this.theme = 'dark';
            }
            else
            {
                console.log("Dark Theme!");
                this.theme = 'light';
            }
            this.count++;
            
            console.log(this.theme);
        }
    }

}).mount('#app');