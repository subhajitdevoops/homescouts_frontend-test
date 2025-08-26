import React from "react";
import { Page, Text, View, Document, StyleSheet,a } from "@react-pdf/renderer";
import pdfs from './test.pdf'

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const DocumentViewer = ({Doc}) => {
  return (
    <Document  file={pdfs}>
      {/* <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <iframe src={Doc}>base64</iframe>

        </View>
      </Page> */}
    </Document>
  );
};

export default DocumentViewer;
