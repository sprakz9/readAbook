import { StyleSheet } from "react-native";


export const stylesModal = StyleSheet.create({
    Modalcontainer: {
        flex: 1,
        padding : 10,
        backgroundColor : "black",
        borderRadius : 20
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
        justifyContent : "space-between",
        alignItems : "center",
        marginHorizontal : 20
    },
    btnBuyModal : {
        backgroundColor : "#00bf6c",
        width : 150,
        height : 40,
        borderRadius : 20,
        marginTop : 10,
        justifyContent: 'center',
        alignItems : "center",
    },
    textbtnBuyModal : {
        color : "black",
        textAlign : "center",
        fontWeight : "bold"
    },
    btnBookMarks : {
        backgroundColor : "#FDA5DA",
        width : 150,
        height : 40,
        borderRadius : 20,
        marginTop : 10,
        justifyContent: 'center',
        alignItems : "center"
    },
    descrtiptionModal : {
        color : "#ECECEC",
        marginLeft : 4,
        marginTop : 30,
        fontSize : 15
    },
    bthClosePopUp : {
        color : "white",
        fontSize : 15,
        textAlign : "right",
        marginBottom : 5,
    },
    dataModalContainer : {
        marginTop : 10,
    },
    dataModal : {
        color : "white",
    },
})