import { LightningElement } from 'lwc'
import { loadScript } from 'lightning/platformResourceLoader'
import admin from '@salesforce/resourceUrl/admin'


export default class Test extends LightningElement {
  renderedCallback () {
    window.regeneratorRuntime = undefined;
    let authToken = '';
    let assetId = '';
    // call script loaders...
    Promise.all([loadScript(this, admin + '/admin-bundle.js')])
      .then(() => {
        window
          .threekitPlayer({
            authToken: authToken,
            el: this.template.querySelector('.tkplayer'),
            assetId: assetId,
            showConfigurator: false,
            showAR: false,
            showLoadingThumbnail: true
          })
          .then(async player => {
            window.player = player
            this.configurator = await player.getConfigurator()
            await player.when('loaded')
            // Logic to do after the player loads
          })
      })
      .catch(error => {
        console.log('Threekit Error', error)
      })

    
  }
}
