import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { createAssetIdToken } from '../../scripts/utils';

const { REACT_APP_RADIANT_LICENSE } = process.env;

export default function RadiantPlayer(props) {
  console.log(props);
  const rmpPlayer = useRef();

  const history = useHistory();

  useEffect(() => {
    let radiantscript, vodjs; //  ,eventScript

    if (props.secretKey && props.itemId) {

      const createScript = () => {
        radiantscript = document.createElement('script');
        vodjs = document.createElement('script');
        //eventScript = document.createElement('script');

        radiantscript.src =
          'https://cdn.radiantmediatechs.com/rmp/6.4.11/js/rmp.min.js';
        radiantscript.async = true;
        vodjs.src =
          'https://icareus-suite.secure2.footprint.net/lib/js/v4/players/vod.js';
        vodjs.async = true;
        // eventScript.src = 'https://my.icareus.com/lib/js/v1/players/events.js';
        // eventScript.async = true;
        document.body.appendChild(radiantscript);
        document.body.appendChild(vodjs);
        // document.body.appendChild(eventScript);
      };
      createScript();

      window._icareus = {};

      window._icareus.companyId = props.companyId;

      window._icareus.groupId = props.groupId;

      window._icareus.organizationId = props.organizationId;

      window._icareus.itemId = props.itemId;

      window._icareus.host = 'https://suite.icareus.com';
      window._icareus.playerId = 'rmpPlayer';
      window._icareus.playerType = 'radiant';
      window._icareus.playerSetup = 'vodJSCallback';
      window._icareus.playerAutoStart = true;
      window._icareus.userId = props.userId;

      window._icareus.token = createAssetIdToken(
        props.organizationId,
        props.itemId,
        false,
        props.secretKey
      );

      console.log(window._icareus.token);

      const backButtonHandler = () => {
        props.backRoute ? history.push(props.backRoute) : history.goBack();
      };

      // Then we define a custom module - in this case a 10s rewind module
      const backCustomModule = {
        hint: 'Back', // Then name of the module - will show as hint within player UI
        svg: 'https://www.kirjastokino.fi/on-demand-player-portlet/images/button_back.svg', // Then SVG icon for the module
        svgHover:
          'https://www.kirjastokino.fi/on-demand-player-portlet/images/button_back.svg', // TODO: Image from /images, not web url
        // An optional second icon that can be displayed when the module is hovered
        callback: function () {
          // Our callback function
          backButtonHandler();
        },
      };

      // customModule must be passed as an Array
      const customModule = [backCustomModule];

      // captions
      // Your WebVTT closed captions
      const ccFiles = [
        [
          'en',
          'English',
          'https://www.radiantmediaplayer.com/media/vtt/captions/cc.vtt',
        ],
        [
          'fr',
          'Français',
          'https://www.radiantmediaplayer.com/media/vtt/captions/cc-fr.vtt',
        ],
      ];
      let settings;

      // function functionOne(_callback) {
      //   window._icareus.eventIdActual = 1408801;
      //   window._icareus.assetId = 1407203;
      //   window.EVENT_ANALYTICS.init();

      //   _callback();
      // }

      window.vodJSCallback = function () {
        // Then we set our player settings
        settings = {
          licenseKey: `${REACT_APP_RADIANT_LICENSE}`,
          src: window._icareus.sources,

          // height and width selected based on 16/9 aspect ration
          autoHeightMode: true,
          autoHeightModeRatio: 1.7777777778,
          // Let us select a skin (options aree s1,s2,s3 and s4)
          skin: props.skin ? props.skin : 's1',

          // skinBackgroundColor should be rgba
          skinBackgroundColor: props.skinBackgroundColor
            ? props.skinBackgroundColor
            : 'rgba(33, 33, 33, 0.85)',
          skinButtonColor: 'rgba(255, 255, 255, 1)',
          skinAccentColor: 'rgba(130, 177, 255, 1)',

          // this is for playback speed
          speed: props.speed ? true : false,
          automaticFullscreenOnLandscape: true,
          // Let us add a poster frame to our player

          contentMetadata: {
            title: props.title ? props.title : null,
            description: props.description ? props.description : null,
            poster: [props.poster ? props.poster : window._icareus.thumbnail],
          },

          ccFiles,
          customModule: customModule,

          // Here we pass the ID of the player container so that the core library may automatically initialise player when it finishes loading
          asyncElementID: rmpPlayer.current.id,
        };

        window._icareus.playerObject.init({ ...settings });

        // functionOne(() => {});
      };
      console.log(window)
      return () => {
        document.body.removeChild(radiantscript);
        document.body.removeChild(vodjs);

        // document.body.removeChild(eventScript);
      };
    }
  }, [
    props.src,
    props.skinBackgroundColor,
    props.skin,
    props.speed,
    props.title,
    props.description,
    props.poster,
    history,
    props.backRoute,
    props.companyId,
    props.groupId,
    props.organizationId,
    props.itemId,
    props.token,
    props.secretKey,
    props.userId
  ]);

  return (
    // you may set the width even in the parent component to make these values as variables
      <div ref={rmpPlayer} id='rmpPlayer'></div>
  );
}
