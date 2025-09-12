import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from './Components/Switch';
import ProgressBar from './Components/ProgressBar';
import CirucularProgressBar from './Components/SpinnerLoader';
import TextInputCustom from './Components/TextInputCustom';
import ButtonCustom from './Components/ButtonCustom';
import Stepper from "./Components/Stepper";
import Toast from "./Components/Toast";

function ExampleView() {
    const [text, setText] = useState("");
    const [showToast, setShowToast] = useState(false);
    const data = [
        {
            title: "Wifi",
            status: true
        }, {
            title: "Salvapantallas",
            status: false
        }
    ]

    const ShowText = () => {
        console.log(text);
    }
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            {
                data.map((item, index) => (
                    <Switch key={index} isActivated={item.status} />
                ))
            }
            <ProgressBar progressPorcent={28} />
            <ProgressBar progressPorcent={78} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <CirucularProgressBar slideColor={'#f86e83ff'} />
                <CirucularProgressBar slideColor={'#6ef885ff'} backgroundColor={"#d2ffdaff"} />
                <CirucularProgressBar slideColor={'#6e8ef8ff'} backgroundColor={"transparent"} />
            </View>
            <TextInputCustom
                isLimited={true}
                maxLength={10} //Limit text
                onTextChange={(value) => setText(value)}  //Returning the text
            />
            <TextInputCustom
                onTextChange={(value) => setText(value)}  //Returning the text
            />

            <ButtonCustom
                textButton="Atención"
            />
            <ButtonCustom
                buttonColor={'#64cb4fff'}
                textColor={'#fff'}
                textSize={20}
                textButton="Mostrar Texto"
                onPress={ShowText}
            />
            <ButtonCustom
                buttonColor={'rgba(203, 79, 137, 1)'}
                textColor={'#fff'}
                textSize={20}
                textButton="Show Toast"
                onPress={() => {
                    ShowText();
                    setShowToast(true);
                }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingInline: 10 }}>
                <Stepper />
                <Stepper initalValue={990} />
            </View>

            <Toast message={text} visible={showToast} />
            {/* <Toast message={text} visible={showToast} toastColor="#dfdfdfff" textColor="#1e1e1e"/> */}
        </SafeAreaView>
    )
}

export default ExampleView;