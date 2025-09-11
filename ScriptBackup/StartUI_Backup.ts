import * as hz from "horizon/core";
import * as hzUI from "horizon/ui";

type StartBtnProp = {
  label: string;
  onClick: hzUI.Callback;
  style: hzUI.ViewStyle;
  baseColor: string;
};

function StartBtn(props:StartBtnProp) : hzUI.UINode
{
  return hzUI.Pressable({
    children:[
      hzUI.Text({
        text:props.label,
        style:{
          
        }
      })
    ],
    onClick:props.onClick,
    style:{
      backgroundColor:props.baseColor,
      borderRadius:10,
      width:200,
      height:100,
      alignItems:"center",
      justifyContent:"center",
      ...props.style
    }
  });
}

class StartUI extends hzUI.UIComponent<typeof StartUI> {
  static propsDefinition = {};

  initializeUI(): hzUI.UINode {
    return hzUI.View({
      children:[
        hzUI.Text({
          text:"Let's Make Some Art!",
          style:{
            color:"black",
          },
        }),
        StartBtn({
          label:"Discover Your Art",
          onClick:()=>{},
          style:{},
          baseColor:"green"
        },
        )
      ],
      style:{
        flexDirection:"column",
        alignItems: "center",
        backgroundColor: "#EDE2D5",
        borderRadius: 24,
        height:300,        
      }
    });
  }
}
hzUI.UIComponent.register(StartUI);