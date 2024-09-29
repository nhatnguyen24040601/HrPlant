import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {getColors} from 'theme/CommonColors';
import CommonSize from 'theme/CommonSize';

const ScreenComponent = (props: ViewProps) => {
    return (
        <View style={styles.container}>
            <View {...props} style={[styles.content, props.style]} />
        </View>
    );
};

export default ScreenComponent;

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: getColors().green1, paddingTop: CommonSize.statusBarHeight},
    content: {flex: 1, backgroundColor: getColors().white},
});
