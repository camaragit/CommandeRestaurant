import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {WheelSelector} from "@ionic-native/wheel-selector";
import {ApiProvider} from "../../providers/api/api";
import {GlobalVariableProvider} from "../../providers/gloabal-variable/gloabal-variable";
import {Pro} from "@ionic/pro";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
datauser : FormGroup;
phoneinvalid : boolean = false;




   constructor(public nav: NavController,private URL:GlobalVariableProvider,private api :ApiProvider,private formbuilder : FormBuilder) {

  this.datauser = this.formbuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    adresse: ['', Validators.required],
    montant: ['', Validators.required],
  //  telephone: ['', Validators.required],
    details:['',Validators.required]

  });
  this.Info();
  this.getConf();

  }
  async performAutomaticUpdate() {
    try {
      const currentVersion = await Pro.deploy.getCurrentVersion();
      const resp = await Pro.deploy.sync({updateMethod: 'auto'});
      if (currentVersion.versionId !== resp.versionId){
        console.log("Une nouvelle version est disponible")
        // We found an update, and are in process of redirecting you since you put auto!
      }else{
        // No update available
        console.log("Pas de nouvelle version")

      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err)
      console.log("Erreur "+JSON.stringify(err))
    }
  }
  async Info(){
     try {
       const versionInfo = await Pro.deploy.getCurrentVersion();
       console.log("Information version"+JSON.stringify(versionInfo));
     }
     catch (err){
       console.log("erreur "+JSON.stringify(err));

     }

  }
  async getConf(){
    try {
      const versionInfo = await Pro.deploy.getConfiguration();
      console.log("Information version"+JSON.stringify(versionInfo));
    }
    catch (err){
      console.log("erreur "+JSON.stringify(err));

    }

  }

  veriftel()
  {
    let suffix =  this.datauser.controls['telephone'].value.substring(0,2);
    let tabsuffix =['77','70','76','78'];
    this.phoneinvalid = (tabsuffix.indexOf(suffix)===-1 || this.datauser.controls['telephone'].value.length!==9)  ? true :false;

  }
  resetphone(){
    this.phoneinvalid = false;
  }

  // register and go to home page
  register() {
  this.api.afficheloading();
      //  let datenaiss = this.formaterdate(this.datauser.controls['datenaissance'].value);
          //http://services.ajit.sn/ws/client/commande?prenom=prenom&nom=nom&adresse=adresse&montant=montant&detail=detail
        let url = this.URL.URL+"commande?prenom="+encodeURI(this.datauser.controls['prenom'].value)+"&nom="+this.datauser.controls['nom'].value;
        url += "&adresse="+encodeURI(this.datauser.controls['adresse'].value)+"&montant="+encodeURI(this.datauser.controls['montant'].value);
     //   url += "&nom="+encodeURI(this.datauser.controls['nom'].value)+"&telephone="+encodeURI(this.datauser.controls['telephone'].value);
        url += "&detail="+encodeURI(this.datauser.controls['details'].value);
        console.log("url===>"+url);
        this.api.getpost(url).then(data=>{
          this.api.dismissloadin();
         console.log(JSON.stringify(data))
          this.api.dismissloadin();
          let val = JSON.parse(data.data);
          if(val.code=="0")
          {
            this.api.showAlert(val.message);
            this.datauser.reset();
          }
          else this.api.showError(val.message)


       }).catch(err=>{
         this.api.dismissloadin();

       })



  }

}
