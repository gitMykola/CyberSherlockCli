export function config() {
    return {
        app: {
            name: 'Cyber Sherlock',
            url_client: 'http://localhost:4201',
            url_server: 'http://localhost:3080',
            default_lang: 'EN',
            facebook: {},
            google: {
                apiKey: 'AIzaSyCQqiOB_uS2YEbV5d9vsPUpb4s5VavxulQ',
                clientId: '614754642660-hhpv7vv258h3f4h55uavv5glnhb46ctu.apps.googleusercontent.com',
                clientSecret: '460dDbvoTichx4JLr4E_RDse',
                scopes: 'profile'
            },
            linked: {},
            twitter: {},
            topnav: [
                {
                    name: 'map',
                    icon: 'map',
                    disabled: false,
                    login: false
                },
                {
                    name: 'howto',
                    icon: 'live_help',
                    disabled: false,
                    login: false
                },
                {
                    name: 'about',
                    icon: 'public',
                    disabled: false,
                    login: false
                },
                {
                    name: 'events',
                    icon: 'public',
                    disabled: true,
                    login: false
                },
                {
                    name: 'contacts',
                    icon: 'contact_mail',
                    disabled: true,
                    login: false
                },
                {
                    name: 'enter',
                    icon: 'person_add',
                    disabled: false,
                    login: true
                },
                {
                    name: 'exit',
                    icon: 'exit_to_app',
                    disabled: false,
                    login: true
                }
            ],
            dash: {
                categories: [
                    {
                        name: 'people',
                        icon: 'people',
                        auth: true,
                        selected: false
                    },
                    {
                        name: 'media',
                        icon: 'add_a_photo',
                        auth: false,
                        selected: true
                    },
                    {
                        name: 'tasks',
                        icon: 'add_location',
                        auth: true,
                        selected: false
                    }
                ],
                actions: [
                    {
                        action: 'find',
                        icon: 'my_location',
                        auth: false
                    },
                    {
                        action: 'add',
                        icon: 'add_circle_outline',
                        auth: false
                    },
                    {
                        action: 'edit',
                        icon: 'edit_location',
                        auth: false
                    },
                    {
                        action: 'remove',
                        icon: 'remove_circle_outline',
                        auth: false
                    },
                    {
                        action: 'hide',
                        icon: 'flip_to_back',
                        auth: false,
                        selected: false
                    }
                ]
            },
            map: {
                default_sets: {
                    lat: 46.43192571103273,
                    lng: 30.742602070500197,
                    zoom: 18,
                    iconUrl: '../../assets/img/icons/mapGPS/center_32.png'
                }
            }
        },
        dev: {
            mode: 1
        }
    };
}
