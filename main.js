const EventBus = new Vue();

const app = new Vue({
    el: '#app',
    data() {
        return {
            currentView: 'list',
        }
    },

    components: {

        // Component Home (&first page)
        Home: {
            template: '#home-template'
        },

        // Component Registration Form (&second page)
        Form_reg: {
            template: '#form-template',
            data() {
                return {
                    text: 'Registration Form',
                    show: false,
                    user: {},
                    messageUser: ''
                }
            },
            // computed for Form component
            computed: {
                havePhoto() {
                    return this.user.picture !== '';
                },
                userMessageData() {
                    return `User: ${this.user.firstName} ${this.user.lastName} tel.: ${this.user.phone}`;
                },
                userShow() {
                    return (this.user.firstName && this.user.lastName);
                }
            },
            // method for Form component
            methods: {
                clearForm() {
                    for (let key in this.user) {
                        this.user[key] = '';
                    }
                },
                saveUser() {
                    for (let prop in this.user) {
                        if (this.user[prop] === '') {
                            if (prop === "_id" || prop === "isActive") continue;
                            alert(`Empty field: ${prop}`)
                            return;
                        }
                    }
                    EventBus.$emit('addUser', this.user);
                    this.clearForm();

                },
                setUserDate(obj) {
                    console.dir(obj);
                },
                getUser() {
                    let options = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    axios.get('./user.json', options)
                        .then(response => {
                            this.user = response.data[1];
                            this.setUserDate(this.user);
                        })
                        .catch(error => {
                            let err = new Error(error);
                            console.log(err);
                        });

                }
            },
            // created for Form component
            created() {
                this.getUser();
            }
        },

        // Component List (&third page)
        List: {
            template: '#list-template',
            data() {
                return {
                    text: 'List User',
                    list: []
                }
            },
            // method for List component
            methods: {
                getAllUser() {
                    axios({
                        method:'get',
                        url:'./user.json',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => {
                            this.list = [...response.data];
                            // console.log(this.list);
                        })
                        .catch(error => {
                            let err = new Error(error);
                            console.log(err);
                        });
                }
            },
            // computed for List component
            computed: {
                count() {
                  return (this.list.length);
                }
            },
            // mounted for List component
            mounted() {
                this.getAllUser();
            }
        }
    },
    // method for exemplar Vue (app)
    methods: {
        switchView(view) {
            this.currentView = view
        }
    }
});

// Users/alpoliakov/Library/Mobile\ Documents/com~apple~CloudDocs/Vue/VueForm

