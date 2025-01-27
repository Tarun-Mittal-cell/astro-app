import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

// Register fonts for PDF
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF7E1D',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4B0082',
    fontWeight: 'bold',
    borderBottom: '1 solid #E5E7EB',
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#FF7E1D',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    borderTop: '1 solid #E5E7EB',
    borderLeft: '1 solid #E5E7EB',
  },
  gridItem: {
    width: '33%',
    padding: 8,
    borderRight: '1 solid #E5E7EB',
    borderBottom: '1 solid #E5E7EB',
  },
  aspectGrid: {
    marginTop: 10,
    borderTop: '1 solid #E5E7EB',
    borderLeft: '1 solid #E5E7EB',
  },
  aspectRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #E5E7EB',
  },
  aspectCell: {
    width: '10%',
    padding: 5,
    borderRight: '1 solid #E5E7EB',
    fontSize: 10,
    textAlign: 'center',
  },
  dashaTable: {
    marginTop: 10,
    borderTop: '1 solid #E5E7EB',
    borderLeft: '1 solid #E5E7EB',
  },
  dashaRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #E5E7EB',
  },
  dashaCell: {
    flex: 1,
    padding: 8,
    borderRight: '1 solid #E5E7EB',
    fontSize: 11,
  },
  chartImage: {
    width: '100%',
    height: 300,
    marginVertical: 15,
  },
  interpretation: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6B7280',
    borderTop: '1 solid #E5E7EB',
    paddingTop: 10,
  },
  highlight: {
    color: '#FF7E1D',
    fontWeight: 'bold',
  },
  planetList: {
    flexDirection: 'column',
  },
  planetItem: {
    marginBottom: 5,
  },
  planetName: {
    fontWeight: 'bold',
  },
  planetInfo: {
    fontSize: 10,
  },
});

interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
  dignity: string;
  aspects: Array<{
    planet: string;
    aspect: string;
    orb: number;
    nature: string;
  }>;
}

interface HouseSystem {
  house: number;
  sign: string;
  degree: number;
  planets: string[];
  interpretation: string;
}

interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  significance: string;
}

interface ChartData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: string;
  ayanamsa: string;
  positions: PlanetaryPosition[];
  houses: HouseSystem[];
  dashas: DashaPeriod[];
  yogas: Array<{
    name: string;
    description: string;
    influence: string;
  }>;
  generalReading: string;
  chartImage: string;
}

interface ChartPDFProps {
  data: ChartData;
}

const PDFDocument = ({ data }: ChartPDFProps) => {
  if (!data) {
    return null;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.header}>Divine Vaani Birth Chart Analysis</Text>
          <Text style={styles.subHeader}>Vedic Astrological Report</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.text}>Name: {data.name || 'N/A'}</Text>
          <Text style={styles.text}>Birth Date: {data.birthDate || 'N/A'}</Text>
          <Text style={styles.text}>Birth Time: {data.birthTime || 'N/A'}</Text>
          <Text style={styles.text}>Birth Place: {data.birthPlace || 'N/A'}</Text>
          <Text style={styles.text}>Coordinates: {data.latitude || 0}°N, {data.longitude || 0}°E</Text>
          <Text style={styles.text}>Time Zone: {data.timezone || 'N/A'}</Text>
          <Text style={styles.text}>Ayanamsa: {data.ayanamsa || 'N/A'}</Text>
        </View>

        {/* Birth Chart Wheel */}
        {data.chartImage && (
          <View style={styles.section}>
            <Text style={styles.title}>Birth Chart Wheel</Text>
            <Image 
              style={styles.chartImage} 
              src={{ uri: data.chartImage, method: 'GET', headers: {} }}
              cache={true}
            />
          </View>
        )}

        {/* Planetary Positions */}
        <View style={styles.section}>
          <Text style={styles.title}>Planetary Positions</Text>
          <View style={styles.gridContainer}>
            {data.positions?.map((pos, index) => (
              <View key={index} style={styles.gridItem}>
                <Text style={styles.subtitle}>{pos.planet}</Text>
                <Text style={styles.text}>Sign: {pos.sign}</Text>
                <Text style={styles.text}>Degree: {pos.degree.toFixed(1)}°</Text>
                <Text style={styles.text}>House: {pos.house}</Text>
                <Text style={styles.text}>Dignity: {pos.dignity}</Text>
                {pos.retrograde && (
                  <Text style={[styles.text, styles.highlight]}>Retrograde</Text>
                )}
              </View>
            )) || <Text style={styles.text}>No planetary positions available</Text>}
          </View>
        </View>

        {/* House Placements */}
        <View style={styles.section}>
          <Text style={styles.title}>House Placements & Interpretations</Text>
          {data.houses?.map((house, index) => (
            <View key={index} style={styles.interpretation}>
              <Text style={styles.subtitle}>House {house.house} - {house.sign}</Text>
              <Text style={styles.text}>Degree: {house.degree.toFixed(1)}°</Text>
              <Text style={styles.text}>Planets: {house.planets?.join(', ') || 'None'}</Text>
              <Text style={styles.text}>{house.interpretation}</Text>
            </View>
          )) || <Text style={styles.text}>No house interpretations available</Text>}
        </View>
      </Page>

      {/* Additional Pages */}
      <Page size="A4" style={styles.page}>
        {/* Planetary Aspects */}
        <View style={styles.section}>
          <Text style={styles.title}>Planetary Aspects</Text>
          <View style={styles.aspectGrid}>
            {data.positions?.map((pos) => (
              <View key={pos.planet} style={styles.aspectRow}>
                {pos.aspects?.map((aspect, index) => (
                  <View key={index} style={styles.aspectCell}>
                    <Text>{aspect.planet}</Text>
                    <Text>{aspect.aspect}</Text>
                    <Text>{aspect.orb}°</Text>
                    <Text style={{ color: aspect.nature === 'Beneficial' ? '#059669' : '#DC2626' }}>
                      {aspect.nature}
                    </Text>
                  </View>
                ))}
              </View>
            )) || <Text style={styles.text}>No aspects data available</Text>}
          </View>
        </View>

        {/* Dasha Periods */}
        <View style={styles.section}>
          <Text style={styles.title}>Vimshottari Dasha Predictions</Text>
          <View style={styles.dashaTable}>
            {data.dashas?.map((dasha, index) => (
              <View key={index} style={styles.dashaRow}>
                <View style={styles.dashaCell}>
                  <Text style={styles.subtitle}>{dasha.planet}</Text>
                </View>
                <View style={styles.dashaCell}>
                  <Text>{dasha.startDate} - {dasha.endDate}</Text>
                </View>
                <View style={[styles.dashaCell, { flex: 2 }]}>
                  <Text>{dasha.significance}</Text>
                </View>
              </View>
            )) || <Text style={styles.text}>No dasha predictions available</Text>}
          </View>
        </View>

        {/* Yogas and Combinations */}
        <View style={styles.section}>
          <Text style={styles.title}>Astrological Yogas</Text>
          {data.yogas?.map((yoga, index) => (
            <View key={index} style={styles.interpretation}>
              <Text style={styles.subtitle}>{yoga.name}</Text>
              <Text style={styles.text}>{yoga.description}</Text>
              <Text style={[styles.text, styles.highlight]}>Influence: {yoga.influence}</Text>
            </View>
          )) || <Text style={styles.text}>No yoga combinations found</Text>}
        </View>
      </Page>

      {/* General Reading Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Personalized Astrological Reading</Text>
          <Text style={styles.text}>{data.generalReading || 'No personalized reading available'}</Text>
        </View>

        {/* Footer on each page */}
        <View style={styles.footer}>
          <Text>Generated by Divine Vaani © {new Date().getFullYear()}</Text>
          <Text>For personal guidance and detailed consultation, connect with our expert astrologers</Text>
        </View>
      </Page>
    </Document>
  );
};

export function ChartPDF({ data }: ChartPDFProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="mt-4">
      <PDFDownloadLink
        document={<PDFDocument data={data} />}
        fileName={`divine_vaani_birth_chart_${data.name?.toLowerCase().replace(/\s+/g, '_') || 'chart'}.pdf`}
        className="w-full"
        onClick={(e) => {
          if (!data.chartImage) {
            e.preventDefault();
            alert('Chart image is not available');
          }
        }}
      >
        {({ loading }) => (
          <Button 
            className="w-full bg-[#FF7E1D] hover:bg-[#FF7E1D]/90"
            disabled={loading}
          >
            <FileDown className="mr-2 h-4 w-4" />
            {loading ? 'Preparing Your Detailed Birth Chart...' : 'Download Comprehensive Birth Chart PDF'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}