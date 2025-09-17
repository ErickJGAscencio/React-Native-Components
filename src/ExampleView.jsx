import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from './Components/Switch';
import ProgressBar from './Components/ProgressBar';
import CirucularProgressBar from './Components/SpinnerLoader';
import TextInputCustom from './Components/TextInputCustom';
import ButtonCustom from './Components/ButtonCustom';
import Stepper from "./Components/Stepper";
import Toast from "./Components/Toast";
import InfoTooltip from "./Components/InfoTooltip";
import RadioButtonGroup from "./Components/RadioButtonGroup";
import Skeleton from "./Components/Skeleton";
import Chip from "./Components/Chip";
import Carousel from "./Components/Carousel";

function ExampleView() {
    const [text, setText] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const imgsRoutes = [
        'https://2.bp.blogspot.com/-_VS7i7Jnp-s/UcBdeNBKCqI/AAAAAAAB0W0/n6AlrQeZdwg/s1600/Amanecer-en-Alaska.jpg',
        'https://3.bp.blogspot.com/-tcb1UL2M3So/U3zj4eaKYjI/AAAAAAACND0/lazS68SNa5A/s1600/las-fotos-mas-lindas-y-hermosas-de-internet-fondos-y-wallpapers-gratis-para-compartir-imagenes-gratis+(7).jpg',
        'https://2.bp.blogspot.com/-9JiPFc3n9Hw/U_ekBAgaiMI/AAAAAAACR5c/qa8cABmAnUM/s1600/arbol%2Bsolitario%2Ben%2Blos%2Bverdes%2Bprados.jpg',
        'https://3.bp.blogspot.com/-DX9-ZpjN904/U_emMocc4uI/AAAAAAACR70/ll9TwkTijL4/s1600/saint-michael-church-brixen-1920x1200-wallpaper.jpg'
    ]
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
        <SafeAreaView style={{ flex: 1, display: 'flex', justifyContent: 'space-between', width: '100%', paddingInline: 10 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>


                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Carousel 
                        imagesRoutes={imgsRoutes} 
                        autoScroll={true}
                        scrollInterval={5500}
                    />
                </View>

                <View
                    style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                    {
                        data.map((item, index) => (
                            <Switch
                                key={index}
                                isActivated={item.status}
                                onToggle={(value) => console.log("El switch está en:", value)}
                            />

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

                    <InfoTooltip
                        message="Este campo es obligatorio"
                        backgroundColor="#ff9900"
                        tooltipColor="#fffbe6"
                    />
                    <InfoTooltip
                        message="Esta es la información que se da para algún campo."
                        tooltipColor="#fffbe6"
                        position="left"
                    />
                    <InfoTooltip
                        message="Este campo no debe ser modificado."
                        position="right"
                        backgroundColor="#db1414ff"
                        tooltipColor="#fffbe6"
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                        <RadioButtonGroup options={['Opción 1', 'Opción 2', 'Opción 3']} onSelect={value => console.log(value)} />
                        <RadioButtonGroup options={['Opción 1', 'Opción 2', 'Opción 3']} color="#be2faeff" onSelect={value => console.log(value)} />
                    </View>

                    <View style={{ flex: 1, width: '100%', flexDirection: 'column', gap: 10 }}>
                        <Skeleton />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                            <Skeleton width={48} />
                            <Skeleton width={48} />
                        </View>
                        <Skeleton />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                            <Skeleton width={30} />
                            <Skeleton width={30} />
                            <Skeleton width={30} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, justifyContent: 'space-evenly' }}>
                        <Chip chipTitle="Vehiculos" onRemove={() => ("")} />
                        <Chip chipTitle="Animales" />
                        <Chip chipTitle="Grande" />
                        <Chip chipTitle="Usado" onRemove={() => ("")} />
                    </View>
                </View>
            </ScrollView>
            <Toast message={text} visible={showToast} />
            {/* <Toast message={text} visible={showToast} toastColor="#dfdfdfff" textColor="#1e1e1e" /> */}
        </SafeAreaView>
    )
}

export default ExampleView;