import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  // Answer='not-active'
  constructor( private serv:ServiceService) { 
    console.log(this.questionNumber);


  }

  ngOnInit(): void {
  }

  points:number=0
  counter=60
  questionNumber:number=0
  currentUser=localStorage.getItem("name")
  questions=this.serv.questionlist.questions
  rightAnswers:number=0
  wrongAnswers:number=0
  progress="0"
  isCompleted=false

  nextQuestion(){
      this.questionNumber+=1
  }
  previousQuestion(){
      this.questionNumber-=1
  }

  answer(qnNo:number,option:any){


    if(qnNo==this.questions.length-1){
      setTimeout(() => {
        this.isCompleted=true
      }, 1000);
    }
    
    if(option.correct){

      this.points+=10
      this.rightAnswers++
      setTimeout(()=>{
        this.questionNumber++
        this.getProgress()
      },500)
      
    }else{

      this.points-=10
      this.wrongAnswers++
      setTimeout(()=>{
        this.questionNumber++
        this.getProgress()
      },500)
      
    }
  }

  

  reset(){
    this.questionNumber=0
    this.points=0
    this.wrongAnswers=0
    this.rightAnswers=0
    this.progress="0"
  }

  getProgress(){
    this.progress=((this.questionNumber/this.questions.length)*100).toString()
  }
}
