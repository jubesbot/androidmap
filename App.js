import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Text, Image} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import landmarks from './LandmarkData.json'
import { Card, SearchBar, ListItem, Button, Icon } from 'react-native-elements'

MapboxGL.setAccessToken("pk.eyJ1IjoianViZXNib3QiLCJhIjoiY2tyazlzajBhMDFjMzJvbnZlbjZwMW5lYiJ9.Q3a01Kh1l2FiXUpcQpwlXg");

const App = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [search, setSearch] = useState('')

    const onSelectPoint = event => {
        setCoordinates(event.geometry.coordinates);
        setSelectedPoint(event.properties.id);
    };

    function updateSearch(search){
        setSearch(search)
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.container}>

                    <MapboxGL.MapView
                        style={styles.map}
                        onPress={event => {
                            setCoordinates(event.geometry.coordinates);
                            setSelectedPoint(null);
                        }}>

                        <MapboxGL.Camera
                            zoomLevel={10}
                            centerCoordinate={[103.809623,1.367785]}
                        />

                        {landmarks.data.allLandmarks.map((landmark, i) =>
                            <MapboxGL.PointAnnotation
                                key = {i}
                                id = {landmark.name}
                                coordinate = {[landmark.location.longitude,landmark.location.latitude]}
                                onSelected={onSelectPoint}
                            />
                        )}

                    </MapboxGL.MapView>

                </View>
                <View style={styles.searchbarStyle}>
                    <SearchBar
                        placeholder="Find a landmark..."
                        onChangeText={updateSearch}
                        value={search}
                    />
                </View>

                {coordinates ? (
                    <View style={styles.cardStyle}>
                        <Card>
                            {selectedPoint ? <Card.Title>{selectedPoint}</Card.Title> : null}
                        </Card>
                    </View>
                ) : null}

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    map: {
        flex: 1,
    },
    coordinateViewContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 5,
        width: '100%',
        backgroundColor: 'transparent',
    },
    coordinateView: {
        padding: 5,
        backgroundColor: '#fff',
        flex: 1,
    },
    searchbarStyle:{
        position: 'absolute',
        padding: 10,
        width: "100%",
        backgroundColor: 'transparent'
    },

    cardStyle:{
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: "100%",
        backgroundColor: 'transparent'
    }
});

export default App;
