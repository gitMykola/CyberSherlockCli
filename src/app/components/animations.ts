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
                    offset: 1
                }),
        ]))
    ], {
        params: {
            time: 3000
        }
    }),
    fadeIn: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    opacity: 0,
                    offset: 0}),
            style({
                opacity: 1,
                offset: 1}),
        ]))
    ], {params: {
            time: 3000
        }}),
    scrollOut: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    height: '*',
                    offset: 0
                }),
                style({
                    height: '0px',
                    offset: 1
                }),
            ]))
    ], {
        params: {
            time: 3000
        }
    }),
    scrollIn: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    height: '0px',
                    offset: 0}),
                style({
                    height: '*',
                    offset: 1}),
            ]))
    ], {params: {
            time: 3000
        }})
};
