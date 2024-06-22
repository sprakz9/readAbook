import { StyleSheet } from "react-native";


export const stylesModal = StyleSheet.create({
    Modalcontainer: {
        flex: 1,
        padding : 30,
        backgroundColor : "#626262"
      },
    thumbnailModal : {
        width : 311,
        height : 466,
        resizeMode : "cover"
    },
    thumbnailModalContainer : {
        alignItems : "center"
    },
    titleModal : {
        color : "#FFF9FC",
        marginTop : 20,
        fontSize : 20,
        textAlign : "center",
        fontWeight : "bold"
    },
    authorModal : {
        color : "#00bf6c",
        fontSize : 16,
        marginTop : 6,
        fontWeight : "bold",
        textAlign : "center",
    },
    Containerbtn : {
        flexDirection : "row",
    },
    btnBuyModal : {
        backgroundColor : "#00bf6c",
        width : 150,
        height : 40,
        borderRadius : 20,
        marginTop : 10,
        justifyContent: 'center',
        alignItems : "center",
        marginRight : 10
    },
    textbtnBuyModal : {
        color : "black",
        textAlign : "center",
        fontWeight : "bold"
    },
    btnBookMarks : {
        backgroundColor : "pink",
        width : 150,
        height : 40,
        borderRadius : 20,
        marginTop : 10,
        justifyContent: 'center',
        alignItems : "center"
    },
    descrtiptionModal : {
        color : "#ECECEC",
        fontWeight : "bold",
        marginTop : 4
    },
})