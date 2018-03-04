export function config() {
    return {
        app: {
            default_lang: 'EN',
            facebook: {},
            google: {},
            linked: {},
            twitter: {},
            topnav: [
                'map',
                'howto',
                'about',
                'events',
                'contacts'
            ]
        },
        dev: {
            mode: 1
        }
    };
}
