import { jsPDF } from 'jspdf';
import type { SaunaConfig, PricingResult, ContactInfo } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

export function generatePDF(
  config: SaunaConfig,
  pricing: PricingResult,
  contact: ContactInfo
): jsPDF {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const lineHeight = 7;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Sauna Configuration Spec Sheet', left, y);
  y += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleDateString()}`, left, y);
  y += lineHeight * 2;

  // Contact info
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Information', left, y);
  y += lineHeight + 2;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contactLines = [
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || 'N/A'}`,
    `Address: ${contact.address}`,
  ];
  for (const line of contactLines) {
    doc.text(line, left, y);
    y += lineHeight;
  }
  if (contact.notes) {
    doc.text(`Notes: ${contact.notes}`, left, y);
    y += lineHeight;
  }
  y += lineHeight;

  // Configuration
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Configuration Details', left, y);
  y += lineHeight + 2;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const configLines = [
    `Type: ${config.saunaType} / ${config.shape.replace('_', ' ')}`,
    `Dimensions: ${config.dimensions.width}mm x ${config.dimensions.depth}mm x ${config.dimensions.height}mm`,
    `Bench Tiers: ${config.dimensions.seats}`,
    `Exterior: ${config.materials.exterior}`,
    `Interior: ${config.materials.interior}`,
    `Bench Material: ${config.materials.bench}`,
    `Door Glass: ${config.materials.doorGlass}`,
    `Heater: ${config.heater.type.replace(/_/g, ' ')}`,
    `Stone Capacity: ${config.heater.stoneCapacity}kg`,
    `Chimney: ${config.heater.chimney ? 'Yes' : 'No'}`,
    `Control Panel: ${config.heater.controlPanel}`,
    `Features: ${config.features.length > 0 ? config.features.join(', ') : 'None'}`,
  ];
  for (const line of configLines) {
    doc.text(line, left, y);
    y += lineHeight;
  }
  y += lineHeight;

  // Pricing
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Breakdown', left, y);
  y += lineHeight + 2;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const pricingLines: [string, string][] = [
    ['Base price (size-adjusted)', formatCurrency(pricing.sizeAdjustedPrice)],
    ...pricing.materialCosts.map((c): [string, string] => [c.label, formatCurrency(c.amount)]),
    ['Door glass', formatCurrency(pricing.doorGlassCost)],
    ['Heater', formatCurrency(pricing.heaterCost)],
    ['Heater add-ons', formatCurrency(pricing.heaterAddonsCost)],
    ...pricing.featuresCost.map((c): [string, string] => [c.label, formatCurrency(c.amount)]),
  ];

  for (const [label, amount] of pricingLines) {
    doc.text(label, left, y);
    doc.text(amount, 170, y, { align: 'right' });
    y += lineHeight;
  }

  y += 3;
  doc.setDrawColor(0);
  doc.line(left, y, 190, y);
  y += lineHeight;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total', left, y);
  doc.text(formatCurrency(pricing.total), 170, y, { align: 'right' });
  y += lineHeight * 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Estimated delivery: ${pricing.deliveryEstimate}`, left, y);

  return doc;
}
