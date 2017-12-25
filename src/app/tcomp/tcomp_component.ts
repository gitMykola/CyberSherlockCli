import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { lang } from './assets/lang/ru';

@Component({
    selector: 'app-tcomp',
    templateUrl: './tcomp_component.html',
})
export class TCompComponent implements OnInit {

    private bckg = '/assets/img/odessa.png';
    private sText = '<span>CYBER</span> SHERLOCK';
    private subText = 'ГИБРИДНАЯ ИНТЕРАКТИВНАЯ СИСТЕМА'; // ГИБРИДНАЯ ИНТЕРАКТИВНАЯ СИСТЕМАHYBRID INTERACTIVE ENGINE
    constructor() {
    }
    setStyles() {
        document.querySelector('.start-slide').setAttribute('style',
            'background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/img/odessa.png)');
        document.querySelector('.start-slide h1').innerHTML = this.sText;
        document.querySelector('.start-slide p').innerHTML = this.subText;
    }
    responsive() {
        document.querySelector('.start-slide') .setAttribute('style',
            'height:' + window.innerHeight + 'px;' +
            'background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/img/odessa.png);' +
            '    background-size: cover;');
    }
    ngOnInit() {
        this.setStyles();
        this.responsive();
        window.addEventListener('resize', () => this.responsive());
        window.addEventListener('scroll', () => {
            // console.log(window.pageYOffset);
            if ( window.pageYOffset < 600 ) {
                const dark = 0.0 + window.pageYOffset / 500; console.log(window.pageYOffset + ' rt ' + dark);
                document.querySelector('.start-slide').setAttribute('style',
                    'height:' + window.innerHeight + 'px;' +
                    'background: linear-gradient(rgba(0, 0, 0,0.7) 30%, rgba(255, 233, 215,'
                    + dark + ')), url(/assets/img/odessa.png);\n' +
                    'background-size: cover;');
                document.querySelector('.start-slide .cysh-paragraph-transparent').setAttribute('style',
                    'transform: perspective(1000px) translateZ(-' + window.pageYOffset * 4 + 'px);' +
                    'display:inline;\n' +
                    'position:absolute;\n' +
                    'left:0;\n' +
                    'bottom:400px;\n' +
                    'width:100%;' +
                    'opacity:' + (1 - window.pageYOffset / 200) + ';');
            }
        });
    }
}
