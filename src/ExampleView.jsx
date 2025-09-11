import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from './Components/Switch';
import ProgressBar from './Components/ProgressBar';
import TextInputCustom from './Components/TextInputCustom';

function ExampleView() {

    const data = [
        {
            title: "Wifi",
            status: true
        }, {
            title: "Salvapantallas",
            status: false
        }
    ]

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            {
                data.map((item, index) => (
                    <View key={index} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '90%',
                        marginVertical: 10
                    }}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>{item.title}</Text>
                        <Switch isActivated={item.status} />
                    </View>

                ))
            }
            <ProgressBar progressPorcent={75}/>
            <TextInputCustom
                isLimited={true}
                maxLength={10} //Limit text
                onTextChange={(value) => console.log("Texto:", value)}  //Returning the text
            />
        </SafeAreaView>
    )
}

export default ExampleView;