import { View, StyleSheet, Text } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    element: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '1px 5px',
        fontSize: 10.8
    }
});

const TotalElement = ({ backgroundColor, data }) =>
{
    return <View style={[styles.element, { backgroundColor: backgroundColor != null ? backgroundColor : '#fff' }]}>
        <Text>{data.field}</Text>
        <Text>{data.value}</Text>
    </View>
}

export default TotalElement;