import { View, Text , Modal , ActivityIndicator , StyleSheet} from 'react-native'
import React from 'react'

const LoadingDia : React.FC<{ loading: boolean }> = ({loading}) => { // React.FC<{ loading: boolean }> เอาไว้ระบบ type
  return (
    <Modal //ไว้ใช้แสดงหน้าจอเมื่อ load
          transparent={true} //ทำให้ Model โปร่งเมื่อมีค่าเป็น true
          animationType="none"
          visible={loading} //เมื่อ loading == true จะแสดง Model
          onRequestClose={() => {}} //เมื่อ Model false จะสั่งปิด
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color="#0000ff" animating={loading} />
            </View>
          </View>
      </Modal>
  )
}
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
export default LoadingDia