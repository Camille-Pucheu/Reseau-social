import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
/********* Service,s *********/
import { AuthentificationService } from '../../services/authentification.service';
import { PostService } from '../../services/post.service';
/********* Modèle,s *********/
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {

  authentificationStatus : boolean | undefined;

  newPost: string = 'Quoi de neuf ?';

  @Input() activePage: string = '';
  @Input() profilPosts: any = [];
  posts?: PostModel[];
  post: PostModel = {
    auteur: '',
    userId: '',
    message: ''
  };
  @Output() public newPostEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthentificationService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.authentificationStatus = this.authService.authentification;
  }
  
  ngOnChanges(): void {
    this.postsAAfficher();
  }
  

  postsAAfficher() {
    if (this.activePage == 'accueil') {
      this.afficherTousLesPosts();
    } else {
      this.posts = this.profilPosts;
    }
  }

  afficherTousLesPosts(): void {
    this.postService.voirTousLesPosts()
      .subscribe({
        next: (data) => {
          this.posts = data;
        },
        error: (e) => console.error(e)
      });
  }

  miseAJourPosts(): void {
    this.post = {
      auteur: '',
      userId: '',
      message: '',
    };
    this.newPost = '';
    this.postsAAfficher()
  }

  nouveauPost(form: NgForm) {
    const text = form.value['post'];
    const data = {
      auteur: this.authService.pseudoUtilisateurConnecte,
      userId: this.authService.idUtilisateurConnecte,
      message: text
    };

    this.postService.creerUnPost(data)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.miseAJourPosts();
        },
        error: (e) => console.error(e)
      });
  }

  public newPostEvent() {
    this.newPostEmitter.emit(true);
  }

}
