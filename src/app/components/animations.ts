import {animate, animation, keyframes, style} from '@angular/animations';

export const anim = {
    fadeOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)',
            keyframes([
            style({
                opacity: 1,
                offset: 0
            }),
            style({
                opacity: 0,
                offset: 0.99
            }),
                style({
                    display: 'none',
                    offset: 1
                }),
        ]))
    ], {
        params: {
            time: 300
        }
    }),
    fadeIn: animation([
        animate('{{ time }}ms cubic-bezier(0, 1, 0, 1)',
            keyframes([
            style({
                display: 'block',
                offset: 0}),
            style({
                opacity: 0,
                offset: 0.01}),
            style({
                opacity: 1,
                offset: 1}),
        ]))
    ], {params: {
            time: 3000
        }})
};
