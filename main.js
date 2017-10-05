const EventBus = new Vue();

const app = new Vue({
    el: '#app',
    data() {
        return {
            currentView: 'list',
        }
    },

    components: {
        home: {
            template: '#home-template'
        },

        form_reg: {
            template: '#form-template',
            data() {
                return {
                    text: 'Registration Form',
                    show: false,
                    user: {
                        name: '',
                        username: '',
                        email: '',
                        photo: '',
                        level: '',
                        date: '',
                        check: ''
                    },
                    listUsers: []
                }
            },
            computed: {
                havePhoto() {
                    return this.user.photo !== '';
                }
            },
            methods: {
                clearForm() {
                    for (let key in this.user) {
                        this.user[key] = '';
                    }
                },
                saveUser() {
                    for (let prop in this.user) {
                        if (this.user[prop] === '') {
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
                getAllUsers() {
                    let options = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    axios.get('./user.json', options)
                        .then(response => {
                            this.list.push(response.data);
                            console.log(this.list[0]);
                        })
                        .catch(error => {
                            let err = new Error(error);
                            console.log(err);
                        });
                    this.setUserDate(this.list);
                },
            },
            created() {
                this.getAllUsers();
            }
        },

        list: {
            template: '#list-template',
            data() {
                return {
                    text: 'List User',
                    listUsers: []
                }
            },
            methods: {
                createUser(user) {
                    return this.listUsers.push(Object.assign({}, user));
                }
            },
            computed: {
                count() {
                    return (this.listUsers.length);
                }
            },
            mounted() {
                EventBus.$on('addUser', (user) => {
                    return this.createUser(user);
                });
            }
        }
    },

    methods: {
        switchView(view) {
            this.currentView = view
        }
    }
});
