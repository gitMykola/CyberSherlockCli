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
            dash: [
                {
                    name: 'catchers',
                    actions: [
                        {
                            action: 'task_done',
                            icon: 'done',
                            auth: true
                        },
                        {
                            action: 'task_catch',
                            icon: 'gps_fixed',
                            auth: true
                        },
                        {
                            action: 'find_catchers',
                            icon: 'group_add',
                            auth: true
                        },
                        {
                            action: 'chat_catcher',
                            icon: 'chat',
                            auth: true
                        },
                    ],
                    auth: true
                },
                {
                    name: 'media',
                    actions: [
                        {
                            action: 'add_photo',
                            icon: 'camera_enhance',
                            auth: false
                        },
                        {
                            action: 'add_video',
                            icon: 'video_call',
                            auth: true
                        },
                        {
                            action: 'find_photo',
                            icon: 'find_in_page',
                            auth: false
                        },
                        {
                            action: 'find_media',
                            icon: 'pageview',
                            auth: true
                        },
                        {
                            action: 'make_high_resolution_photo',
                            icon: 'add_a_photo',
                            auth: true
                        },
                        {
                            action: 'remove_media',
                            icon: 'delete',
                            auth: true
                        }
                    ],
                    auth: false
                },
                {
                    name: 'tasks',
                    actions: [
                        {
                            action: 'get_photo',
                            icon: 'camera_alt',
                            auth: false
                        },
                        {
                            action: 'get_many_photos',
                            icon: 'add_to_photos',
                            auth: true
                        },
                        {
                            action: 'get_video',
                            icon: 'videocam',
                            auth: true
                        },
                        {
                            action: 'detele',
                            icon: 'delete_forever',
                            auth: true
                        }
                    ],
                    auth: false
                }
            ]
        },
        dev: {
            mode: 1
        }
    };
}
