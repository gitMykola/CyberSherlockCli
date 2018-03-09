export function config() {
    return {
        app: {
            default_lang: 'EN',
            facebook: {},
            google: {},
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
            }
        },
        dev: {
            mode: 1
        }
    };
}
