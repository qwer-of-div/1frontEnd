require.config({
    'baseUrl': '/',
    'paths':{
        'header': 'js/modules/header',
        'footer': 'js/modules/footer',
        'jquery': 'libs/jquery/jquery-1.11.3.min',
        'template': 'libs/art-template/template-web',
        'url': 'js/modules/json',
        'zoom': 'libs/jquery-plugins/jquery.elevateZoom',
        'tools': 'js/modules/tools',
        'fly': 'libs/jquery-plugins/jquery.fly',
        'cookie': 'libs/jquery-plugins/jquery.cookie'
    },
    'shim': {
        'zoom': {
            'deps': ['jquery']
        },
        'fly': {
            'deps': ['jquery']
        },
        'cookie': {
            'deps': ['jquery']
        }
    }
})
