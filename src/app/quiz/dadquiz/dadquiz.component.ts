import {AfterViewInit, Component, OnInit, AfterContentChecked, Renderer2} from '@angular/core';
import { ElementRef } from '@angular/core';
import { SurveyResultService } from '../../service/survery-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dadquiz',
  templateUrl: './dadquiz.component.html',
  styleUrls: ['./dadquiz.component.css']
})
export class DadquizComponent implements OnInit, AfterViewInit, AfterContentChecked {
  username  = '';
  public input: any;
  res_one = -1;
  res_two = -1;
  res_three = -1;
  res = [];
  slideIndex = 1;
  quizId = 1;

  // mock quizzes
  // questions
  questions = ['How does he spend a weekend with the kids?',
    'What’s his ideal trip?',
    'If he went missing, where would you look for him?',
    'Which phrase best describes him?',
    'How does he handle emotional moments?',
    'What do you miss most about him when he’s not there?'];

  option_one = ['Go to an amusement park', 'Baking',
    'Play baseball in the yard', 'All of above and taking photos the whole time'];
  option_two = ['Golfing or fishing with buddies', 'Visiting a museum or historic site', 'Reading a book on a beach', 'A stay-cation'];
  option_three = ['The office', 'On the playground', 'The garage', 'Lost in the supermarket'];
  option_four = ['Fun and friendly', 'Smooth and cool', 'Loving but biased', 'Concerned and worried'];
  option_five = ['Burst into tears', 'Hides tears with a joke', 'Gets super sentimental', 'Strong silence'];
  option_six = ['His smile', 'His jokes', 'His hugs', 'His cooking'];
  options = [this.option_one, this.option_two, this.option_three, this.option_four, this.option_five, this.option_six];

  private one_options = ['Big Kid', 'Manny', 'Coach', 'Photographer'];
  private two_options = ['Provider', 'Jokester', 'Handyman', 'Wanderer'];
  private three_options = ['SuperDad', 'Cool Dad', 'Bragger Dad', 'Heli-pop-ter'];

  window_width: number;
  window_height: number;

  constructor(public router: Router,
              public surResult: SurveyResultService,
              private elementRef: ElementRef,
              private render: Renderer2) { }

  register(i) {
    if (this.res[this.slideIndex - 1] !== undefined) {
      console.log('not null');
      this.res[this.slideIndex - 1] = i;
    } else {
      this.res.push(i);
    }

    if (this.res.length >= this.questions.length) {
      this.submit(this.res);
    }
    this.plusSlides(1);
  }

  showSlides(n?) {
    let i;
    const slides = document.getElementsByClassName('slides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    (dots[this.slideIndex - 1] as HTMLElement).classList.add('active');
  }

  // Next/previous controls
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  to_survey() {
    /*document.getElementById('survey_container').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });*/
    document.getElementById('customer_info').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  // img src onerror handler
  imgerrorhandler(event, card, type) {
    event.target.src = '../assets/img_survey_host/cards/dad/0/0.png';
    // need to fix
    // event.target.src = '../assets/img_survey/cards/' + `${card}` + '/' + `${type}` + '/' + '.jpg';
  }

  // API call for card
  submit(res) {
    this.surResult.get_card(this.one_options[this.res[0]], this.two_options[this.res[2]], this.three_options[this.res[3]],
                            this.username, this.quizId);
    // this.router.navigate(['resultpage']);
    this.router.navigate(['result']);
  }

  ngAfterViewInit() {
    this.showSlides();
    this.input.addEventListener('keyup', function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById('ok-btn').click();
      }
    });
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  ngAfterContentChecked() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    this.input = document.getElementById('user_name');
    // let width = Number(window.innerWidth);
    // let height = window.innerHeight;
    // document.getElementById('survey_container').style.marginBottom = width / 60 + 'rem';

    document.getElementById('logo').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    const name_container = document.getElementById('name_container');
    const survey_container = document.getElementById('survey_container');

    this.render.setStyle(name_container, 'padding-top', (this.window_height / 4).toString() + 'px' );
    this.render.setStyle(name_container, 'padding-bottom', (this.window_height).toString() + 'px' );
    this.render.setStyle(survey_container, 'padding-top', (this.window_height / 3).toString() + 'px' );
    this.render.setStyle(survey_container, 'padding-bottom', (this.window_height).toString() + 'px' );
  }

}
