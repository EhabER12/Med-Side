import { BaseRepository } from "./baseRepository.js";
import Settings from "../models/settingsModel.js";

export class SettingsRepository extends BaseRepository {
  constructor() {
    super(Settings);
  }

  async getSettings() {
    const settings = await this.model.findOne();
    if (settings) {
      return settings;
    }

    // Create default settings if none exist
    return this.model.create({
      siteName: "Genoun LLC",
      siteDescription: "Your next adventure starts here",
      contactEmail: "info@travelagency.com",
      contactPhone: "+1234567890",
      address: "123 Travel Street, Adventure City",
    });
  }

  async getDashboardSettings() {
    const settings = await this.model
      .findOne()
      .select(
        "-paymentGateways -notifications -whatsappQrCode -qrCode -subscriptionTeachers -apiKeys"
      );

    if (settings) {
      return settings;
    }

    return this.model.create({
      siteName: "Genoun LLC",
      siteDescription: "Your next adventure starts here",
      contactEmail: "info@travelagency.com",
      contactPhone: "+1234567890",
      address: "123 Travel Street, Adventure City",
    });
  }

  async updateSettings(data, userId) {
    let settings = await this.model.findOne().select("_id");

    if (!settings) {
      settings = await this.model.create({
        siteName: "Genoun LLC",
        siteDescription: "Your next adventure starts here",
        contactEmail: "info@travelagency.com",
        contactPhone: "+1234567890",
        address: "123 Travel Street, Adventure City",
      });
    }

    return this.model.findByIdAndUpdate(
      settings._id,
      {
        $set: {
          ...data,
          updatedBy: userId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async getPublicSettings() {
    const settings = await this.model
      .findOne()
      .select(
        "-_id -__v -updatedAt -createdAt -whatsappConnected -whatsappQrCode -notifications -updatedBy -paymentGateways -subscriptionTeachers -subscriptionStudentProfitSettings -authSettings"
      );
    if (settings) {
      return settings;
    }

    // Create default settings if none exist
    return this.model.create({
      siteName: "Genoun LLC",
      siteDescription: "Your next adventure starts here",
      contactEmail: "info@travelagency.com",
      contactPhone: "+1234567890",
      address: "123 Travel Street, Adventure City",
      isPublic: true,
    });
    return settings;
  }
}
