(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{176:function(e,t,a){e.exports=a(348)},222:function(e,t,a){},346:function(e,t,a){},348:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(7),o=a.n(s),i=a(37),c=a(38),l=a(40),u=a(39),h=a(41),p=a(103),d=a.n(p),m=d.a.initializeApp({apiKey:"AIzaSyCOGzn37DcUSmXyDAB7W9EK6yJTbNkIj7g",authDomain:"moviesta-z.firebaseapp.com",databaseURL:"https://moviesta-z.firebaseio.com",projectId:"moviesta-z",storageBucket:"moviesta-z.appspot.com",messagingSenderId:"471207436083"}),f=d.a.firestore();f.settings({timestampsInSnapshots:!0});d.a.database().ref().child("users");var v=a(106),y=a(29),b=a.n(y),g=a(53),E=a(16),w=a(361),O=a(354),k=a(358),j=a(98),S=a(14),C=a(355),x=a(65),M=a(160),_="c01ce69374cd4bcd642c42dcffb14926",I=a.n(M).a.create({baseURL:"https://api.themoviedb.org/3",timeout:6e5,headers:{"Content-Type":"application/json"}}),T=function(e){return function(t){return I.get("/movie/".concat(e,"?api_key=").concat(_)).then(function(e){return t({type:"FETCH_MOVIE_INFO",payload:e.data})})}},F=a(363),D=a(351),N=a(356),R=a(349),V=(a(219),a(353)),L=a(359),P=a(357),K=a(161),A=a.n(K),U=(a(222),V.a.Meta),W=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isModal:!1,movie:{}},a.handleViewModal=a.handleViewModal.bind(Object(E.a)(Object(E.a)(a))),a.handleClose=a.handleClose.bind(Object(E.a)(Object(E.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleViewModal",value:function(){var e=Object(g.a)(b.a.mark(function e(t){var a;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.props.movieMoreInfo,e.next=3,a(t);case 3:this.setState({isModal:!0,movie:this.props.movie});case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleClose",value:function(){this.setState({isModal:!1})}},{key:"render",value:function(){var e,t=this,a=this.props,n=a.poster_path,s=a.id,o=a.title,i=a.isMovieFav,c=this.state.movie,l=c.genres,u=c.release_date,h=c.homepage,p=c.overview,d=c.vote_average,m=c.popularity,f=c.runtime;return r.a.createElement("div",null,r.a.createElement(V.a,{cover:r.a.createElement("img",{alt:"example",src:"https://image.tmdb.org/t/p/w500/".concat(n)}),actions:[r.a.createElement(L.a,{count:1,key:s,defaultValue:i?1:0,onChange:function(){return t.props.addMovieFav(s)}}),r.a.createElement(S.a,{type:"edit",key:s}),r.a.createElement(S.a,{type:"info-circle",onClick:function(){return t.handleViewModal(s)},key:s})]},r.a.createElement(U,{title:o,description:null})),r.a.createElement(P.a,{title:o,visible:this.state.isModal,onOk:this.handleClose,onCancel:this.handleClose},r.a.createElement("div",{style:{display:"flex",marginBottom:"15px",flexWrap:"wrap"}},r.a.createElement("img",{style:{maxWidth:"360px",width:"100%"},alt:"example",src:"https://image.tmdb.org/t/p/w500/".concat(n)}),r.a.createElement("div",{style:{marginLeft:"15px"},className:"movie__meta"},r.a.createElement("h1",{style:{fontSize:"2.5em"}},r.a.createElement("a",{href:h,rel:"noopener"},o)),r.a.createElement("p",null,(e=u,A()(e).format("YYYY")||"Date Not Found")),r.a.createElement("p",null,l?Object(F.a)("name",l).join(" / "):"No Genres Found"),r.a.createElement("p",null,r.a.createElement(S.a,{type:"clock-circle",theme:"twoTone",twoToneColor:"#52c41a"})," ",f),r.a.createElement("p",null,r.a.createElement(S.a,{type:"line-chart"})," ",m),r.a.createElement("p",null,r.a.createElement(S.a,{type:"notification",theme:"twoTone",twoToneColor:"#fc3"})," ",d))),r.a.createElement("p",null,p)))}}]),t}(n.Component),z=Object(x.b)(function(e){return{movie:e.search.movie}},{movieMoreInfo:T})(W),H=a(100),B=w.a.Header,Y=w.a.Content,X=O.a.SubMenu,q=k.a.Search,G=k.a.Group,J=j.a.Option,Q=new H.a,$=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchType:"title",searchQuery:"",searchPagesCount:0,keywordsIds:[],movies:[],favs:[],mode:"home"},a.handleSearch=a.handleSearch.bind(Object(E.a)(Object(E.a)(a))),a.handlePageChange=a.handlePageChange.bind(Object(E.a)(Object(E.a)(a))),a.fetchMovies=a.fetchMovies.bind(Object(E.a)(Object(E.a)(a))),a.addMovieFav=a.addMovieFav.bind(Object(E.a)(Object(E.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.auth().currentUser.uid&&f.collection("users").doc(m.auth().currentUser.uid).get().then(function(t){t.exists&&e.setState({favs:t.data().favorites})})}},{key:"fetchMovies",value:function(){var e=Object(g.a)(b.a.mark(function e(){var t,a,n,r;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.keywordsIds,e.next=3,this.props.searchMoviesByKeywords(t);case 3:a=this.props,n=a.pageCount,r=a.results,this.setState({searchPagesCount:20*n,movies:r});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"handleSearch",value:function(){var e=Object(g.a)(b.a.mark(function e(t){var a,n,r,s,o,i,c,l,u,h;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({searchQuery:t});case 2:if("title"!==(a=this.state.searchType)){e.next=10;break}return e.next=6,this.props.searchMovies(t);case 6:n=this.props,r=n.pageCount,s=n.results,this.setState({searchPagesCount:20*r,movies:s}),e.next=25;break;case 10:if("keywords"!==a){e.next=25;break}return e.next=13,this.props.searchKeywords(t);case 13:o=this.props,i=o.pageCount,c=o.results,l=Object(F.a)("id",c),u=2;case 16:if(!(u<=i)){e.next=24;break}return e.next=19,this.props.searchKeywords(t,u);case 19:h=Object(F.a)("id",this.props.results),l=[].concat(Object(v.a)(l),Object(v.a)(h));case 21:u++,e.next=16;break;case 24:this.setState({keywordsIds:l.join("|")},this.fetchMovies);case 25:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handlePageChange",value:function(){var e=Object(g.a)(b.a.mark(function e(t){var a,n,r,s;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this.state,n=a.searchType,r=a.searchQuery,s=a.keywordsIds,"title"!==n){e.next=6;break}return e.next=4,this.props.searchMovies(r,t);case 4:e.next=9;break;case 6:if("keywords"!==n){e.next=9;break}return e.next=9,this.props.searchMoviesByKeywords(s,t);case 9:this.setState({movies:this.props.results});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"addMovieFav",value:function(){var e=Object(g.a)(b.a.mark(function e(t){return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.state.favs||!Object(D.a)(t,this.state.favs)){e.next=5;break}return e.next=3,this.setState({favs:Object(N.a)([t],this.state.favs)});case 3:e.next=12;break;case 5:return e.next=7,this.state.favs;case 7:if(!e.sent){e.next=11;break}this.setState({favs:[].concat(Object(v.a)(this.state.favs),[t])}),e.next=12;break;case 11:this.setState({favs:[t]});case 12:f.collection("users").doc(m.auth().currentUser.uid).set({favorites:this.state.favs});case 13:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement(w.a,{className:"layout"},r.a.createElement(B,{style:{display:"flex",alignItems:"center",justifyContent:"space-around"}},r.a.createElement("div",{className:"logo"}),r.a.createElement(G,{compact:!0,style:{width:"70%",display:"flex",justifyContent:"center"}},r.a.createElement(j.a,{defaultValue:this.state.searchType,onChange:function(t){return e.setState({searchType:t})},style:{width:100}},r.a.createElement(J,{value:"title"},"Title"),r.a.createElement(J,{value:"keywords"},"Keywords")),r.a.createElement(q,{placeholder:"Find Movies, TV Shows and more...",onSearch:this.handleSearch,style:{width:400},enterButton:!0})),r.a.createElement(O.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["1"],style:{lineHeight:"34px"}},r.a.createElement(X,{key:"sub1",title:r.a.createElement("span",null,r.a.createElement(S.a,{type:"user"}),r.a.createElement("span",null,"User"))},r.a.createElement(O.a.Item,{key:"1",onClick:function(){return e.setState({mode:"home"})}},"Home"),r.a.createElement(O.a.Item,{key:"2",onClick:function(){return e.setState({mode:"favorite"})}},"Favorite List"),r.a.createElement(O.a.Item,{key:"3",onClick:function(){m.auth().signOut(),Q.remove("token")}},"Sign Out")))),r.a.createElement(Y,{style:{padding:"25px 50px"}},r.a.createElement("div",null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gridAutoRows:"auto",gridGap:"1rem"}},this.state.movies?Object(R.a)(function(t){return console.log(t),r.a.createElement(z,{key:t.id,id:t.id,poster_path:t.poster_path,title:t.title,overview:t.overview,addMovieFav:e.addMovieFav,isMovieFav:!!e.state.favs&&Object(D.a)(t.id,e.state.favs)})},this.state.movies):null),r.a.createElement(C.a,{style:{textAlign:"right",margin:"10px 0"},defaultCurrent:1,onChange:this.handlePageChange,size:"small",pageSize:20,total:this.state.searchPagesCount}))))}}]),t}(n.Component),Z=Object(x.b)(function(e){return{pageCount:e.search.pageCount,results:e.search.results}},{searchKeywords:function(e,t){return function(a){return I.get("/search/keyword?api_key=".concat(_,"&query=").concat(e).concat(t?"&page=".concat(t):"")).then(function(e){return a({type:"SEARCH_KEYWORDS",payload:e.data})})}},searchMoviesByKeywords:function(e,t){return function(a){return I.get("/discover/movie?api_key=".concat(_,"&sort_by=popularity.desc&\n  ").concat(t?"&page=".concat(t):"","&with_keywords=").concat(e)).then(function(e){return a({type:"FETCH_MOVIES_KEYWORDS",payload:e.data})})}},searchMovies:function(e,t){return function(a){return I.get("/search/movie?api_key=".concat(_).concat(t?"&page=".concat(t):"","&query=").concat(e)).then(function(e){return a({type:"SEARCH_MOVIES",payload:e.data})})}},movieMoreInfo:T})($),ee=a(362),te=a(352),ae=a(360),ne=a(45),re=new H.a,se=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={email:"",password:"",isLogin:!0},a.handleSubmit=a.handleSubmit.bind(Object(E.a)(Object(E.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.props.form.validateFields(function(e,a){e||(console.log("Received values of form: ",a),t.setState({email:a.email,password:a.password},function(){t.state.isLogin?m.auth().signInWithEmailAndPassword(t.state.email,t.state.password).then(function(e){return re.set("token",e.user.uid,{path:"/"})}).catch(function(e){return ee.a.error(e.message)}):m.auth().createUserWithEmailAndPassword(t.state.email,t.state.password).then(function(e){return re.set("token",e.user.uid,{path:"/"})}).then(function(){return f.collection("users").doc(m.auth().currentUser.uid.toString()).set({favorits:[]})}).catch(function(e){return ee.a.error(e.message)})}))})}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator;return r.a.createElement(te.a,{onSubmit:this.handleSubmit,className:"login-form",style:{width:"20%",minWidth:"250px",margin:"25px auto"}},r.a.createElement("h1",null,this.state.isLogin?"Sign In":"Sign Up"),r.a.createElement(te.a.Item,null,t("email",{rules:[{required:!0,message:"Please input your Email!"}]})(r.a.createElement(k.a,{type:"email",prefix:r.a.createElement(S.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Email"}))),r.a.createElement(te.a.Item,null,t("password",{rules:[{required:!0,message:"Please input your Password!"}]})(r.a.createElement(k.a,{prefix:r.a.createElement(S.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"Password"}))),r.a.createElement(te.a.Item,null,t("remember",{valuePropName:"checked",initialValue:!0})(r.a.createElement(ae.a,null,"Remember me")),r.a.createElement("p",{className:"login-form-forgot"},"Forgot password"),r.a.createElement(ne.a,{type:"primary",htmlType:"submit",className:"login-form-button"},this.state.isLogin?"Login":"Register"),"Or ",r.a.createElement("a",{href:"#",onClick:function(){return e.setState({isLogin:!e.state.isLogin})}},this.state.isLogin?"Register Now":"Login Instead")))}}]),t}(n.Component),oe=te.a.create()(se),ie=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={user:null,status:"running"},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.state.user,new Date,"before"),m.auth().onAuthStateChanged(function(t){return t?e.setState({user:t,status:"finish"}):e.setState({user:null,status:"finish"})}),console.log(this.state.user,new Date,"after")}},{key:"render",value:function(){return"finish"===this.state.status?this.state.user?r.a.createElement(Z,null):r.a.createElement(oe,null):r.a.createElement("p",null,"waiting...")}}]),t}(n.Component),ce=a(42),le=a(172),ue=a(80),he={pageCount:null,results:{},movie:{}},pe=Object(ce.c)({search:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEARCH_KEYWORDS":case"SEARCH_MOVIES":case"FETCH_MOVIES_KEYWORDS":return Object(ue.a)({},e,{results:t.payload.results,pageCount:t.payload.total_pages});case"FETCH_MOVIE_INFO":return Object(ue.a)({},e,{movie:t.payload});default:return e}}}),de=[le.a],me=Object(ce.e)(pe,{},Object(ce.d)(ce.a.apply(void 0,de),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(346);o.a.render(r.a.createElement(x.a,{store:me},r.a.createElement(ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[176,2,1]]]);
//# sourceMappingURL=main.d977d30b.chunk.js.map