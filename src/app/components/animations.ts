import {animate, animation, keyframes, style} from '@angular/animations';

export const anim = {
    fadeOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                opacity: 1,
                offset: 0
            }),
            style({
                opacity: 0,
                offset: 1
            }),
        ]))
    ], {
        params: {
            time: 300
        }
    }),
    fontIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                fontSize: 0,
                display: 'none',
                offset: 0
            }),
            style({
                display: '*',
                offset: 0.1
            }),
            style({
                fontSize: '*',
                offset: 1
            }),
        ]))
    ], {
        params: {
            time: 300
        }
    })
};
