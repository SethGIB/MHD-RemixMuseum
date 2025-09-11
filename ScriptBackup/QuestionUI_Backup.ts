import * as hz from "horizon/core";
import * as hzUI from "horizon/ui";

type ImageBtnProp = {
  label: string;
  image: hz.Asset,
  onClick: hzUI.Callback;
  style: hzUI.ViewStyle;
  baseColor: string;
};

function ImageBtn(props: ImageBtnProp): hzUI.UINode {
  const DEFAULT_COLOR = props.baseColor;
  const HOVERED_COLOR = "blue";
  const PRESSED_COLOR = "green";
  const backgroundColor = new hzUI.Binding<string>(DEFAULT_COLOR);
  const buttonText = new hzUI.Binding<string>(props.label);
  let hovered = false;

    return hzUI.Pressable({
    children: 
      hzUI.Image({
        source:hzUI.ImageSource.fromTextureAsset(props.image),
        style:{
          width: 120,
          height: 120,
        }
      }),
    onClick: props.onClick,
    onEnter: (player: hz.Player) => {
      backgroundColor.set(HOVERED_COLOR, [player]);
      hovered = true;
    },
    onExit: (player: hz.Player) => {
      backgroundColor.set(DEFAULT_COLOR, [player]);
      buttonText.set(props.label, [player]);
      hovered = false;
    },
    onPress: (player: hz.Player) => {
      backgroundColor.set(PRESSED_COLOR, [player]);
    },
    onRelease: (player: hz.Player) => {
      backgroundColor.set(hovered ? HOVERED_COLOR : DEFAULT_COLOR, [player]);
    },
    style: {
      backgroundColor: backgroundColor,
      borderRadius: 8,
      height: 130,
      width: 130,
      alignItems: "center",
      justifyContent: "center",

      ...props.style,
    },
  });
}

type ImgSelectProp = {
  promptLabel: string;
  onClickModern: hzUI.Callback;
  onClickImpress: hzUI.Callback;
  onClickPre: hzUI.Callback;
};

function ImgSelect(props: ImgSelectProp, modern:hz.Asset, impress:hz.Asset, pre18s:hz.Asset): hzUI.UINode {
  return hzUI.View({
    children: [
      hzUI.Text({
        text: "Which Painting Speaks To You?",
        style: { color: "black", textAlign: "center" },
      }),

      hzUI.View({
        children: [
          ImageBtn({
            label: "Modern",
            image:modern,
            baseColor: "orange",
            onClick: props.onClickModern,
            style: {},
          }),
          ImageBtn({
            label: "Impressionist",
            image: impress,
            baseColor: "orange",
            onClick: props.onClickImpress,
            style: {},
          }),
          ImageBtn({
            label: "Pre-1800s",
            image: pre18s,
            baseColor: "orange",
            onClick: props.onClickPre,
            style: {},
          }),          
        ],

        style: { 
          flexDirection: "row",
          alignItems: "center",
          padding: 10
        },
      }),
    ],
    style: {
      alignItems: "center"
    },
  });
}

//  These functions are called from the arrow function for the MyPrompt object, one for each button.
function selectModern(): void {
  console.log("1");
}
function selectImpress(): void {
  console.log("2");
}
function selectPre(): void {
  console.log("3");
}

class QuestionUI extends hzUI.UIComponent<typeof QuestionUI> {
  static propsDefinition = {
    ModernImage: {type:hz.PropTypes.Asset},
    ImpressImage: {type:hz.PropTypes.Asset},
    PreImage: {type:hz.PropTypes.Asset},
  };
  initializeUI() {
    return hzUI.View({
      children: [
        ImgSelect({
          promptLabel: "Yes or No?",

          onClickModern: () => {
            selectModern();
          },
          onClickImpress: () => {
            selectImpress();
          },
          onClickPre: () => {
            selectPre();
          },          
        },
      this.props.ModernImage!,
      this.props.ImpressImage!,
      this.props.PreImage!),
      ],
      style: {
        alignItems: "center",
        backgroundColor: "#EDE2D5",
        borderRadius: 24,
      },
    });
  }
}

hzUI.UIComponent.register(QuestionUI);