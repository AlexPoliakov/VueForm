const app = new Vue({
    el: '#app',
    data() {
        return {
            currentView: 'home',
        }
    },
    components: {
        home: {
            template: '#home-template'
        },

        formReg: {
            template: '#form-template',
            data() {
                return {
                    text: 'Registration Form'
                }
            }
        },

        list: {
            template: '#list-template',
            data() {
                return {
                    text: 'List User'
                }
            }
        }
    },

    methods: {
        switchView(view) {
            this.currentView = view
        }
    }
});
