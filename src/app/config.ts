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
            ]
        },
        dev: {
            mode: 1
        }
    };
}
