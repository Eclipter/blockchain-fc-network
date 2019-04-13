/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Create Order
 * @param {by.bsuir.fivecubits.OrderCreate} orderCreate - details of new order to be created
 * @transaction
 */
async function createOrder(orderCreate) {
    let orderRegistry = await getAssetRegistry('by.bsuir.fivecubits.Order');
    let contractorRegistry = await getParticipantRegistry('by.bsuir.fivecubits.Contractor');
    let contractor = await contractorRegistry.get(orderCreate.contractorId);

    var order = getFactory().newResource('by.bsuir.fivecubits', 'Order', orderCreate.orderId);
    order.description = orderCreate.description;
    order.contractor = contractor;
    await orderRegistry.add(order);
}

/**
 * Create Ticket
 * @param {by.bsuir.fivecubits.TicketCreate} ticketCreate - details of new ticket to be created
 * @transaction
 */
async function createTicket(ticketCreate) {
    let ticketRegistry = await getAssetRegistry('by.bsuir.fivecubits.Ticket');
    let orderRegistry = await getAssetRegistry('by.bsuir.fivecubits.Order');
    let supplierRegistry = await getParticipantRegistry('by.bsuir.fivecubits.Supplier');
    let supplier = await supplierRegistry.get(ticketCreate.supplierId);
    let order = await orderRegistry.get(ticketCreate.orderId);

    let ticket = getFactory().newResource('by.bsuir.fivecubits', 'Ticket', ticketCreate.ticketId);
    ticket.description = ticketCreate.description;
    ticket.supplier = supplier;
    ticket.order = order;
    await ticketRegistry.add(ticket);
}

/**
 * Create Inspection
 * @param {by.bsuir.fivecubits.InspectionCreate} inspectionCreate - details of new inspection to be created
 * @transaction
 */
async function createInspection(inspectionCreate) {
    let ticketRegistry = await getAssetRegistry('by.bsuir.fivecubits.Ticket');
    let inspectionRegistry = await getAssetRegistry('by.bsuir.fivecubits.Inspection');
    let inspectorRegistry = await getParticipantRegistry('by.bsuir.fivecubits.Inspector');
    let inspector = await inspectorRegistry.get(inspectionCreate.inspectorId);
    let ticket = await ticketRegistry.get(inspectionCreate.ticketId);

    let inspection = getFactory().newResource('by.bsuir.fivecubits', 'Inspection', inspectionCreate.inspectionId);
    inspection.description = inspectionCreate.description;
    inspection.inspector = inspector;
    inspection.ticket = ticket;
    await inspectionRegistry.add(inspection);
}

/**
 * Update ticket status
 * @param {by.bsuir.fivecubits.TicketStatusChange} ticketStatusChange - the status change to be processed
 * @transaction
 */
async function updateTicketStatus(ticketStatusChange) {
    let ticketRegistry = await getAssetRegistry('by.bsuir.fivecubits.Ticket');
    let ticket = await ticketRegistry.get(ticketStatusChange.ticketId);
    ticket.status = ticketStatusChange.newStatus;
    await ticketRegistry.update(ticket);
}

/**
 * Update inspection status
 * @param {by.bsuir.fivecubits.InspectionStatusChange} inspectionStatusChange - the status change to be processed
 * @transaction
 */
async function updateInspectionStatus(inspectionStatusChange) {
    let inspectionRegistry = await getAssetRegistry('by.bsuir.fivecubits.Inspection');
    let inspection = await inspectionRegistry.get(inspectionStatusChange.inspectionId);
    inspection.status = inspectionStatusChange.newStatus;
    await inspectionRegistry.update(inspection);
}