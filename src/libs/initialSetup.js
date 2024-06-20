const RoleSchema = require("../models/RoleModel");
const LearningStyleSchema = require("../models/LearningStyleModel");
const { errorResponse } = require("../middleware/StructureResponse");
async function createRole() {
  try {
    const countRoles = await RoleSchema.estimatedDocumentCount();
    const countStyles = await LearningStyleSchema.estimatedDocumentCount();
    if (countRoles > 0 && countStyles > 0) return;

    await Promise.all([
      new RoleSchema({
        name_role: "user",
        description_role: "user is a public, not have permission admin",
      }).save(),

      new RoleSchema({
        name_role: "admin",
        description_role: "user is a admin, have persmissions of admin",
      }).save(),

      new LearningStyleSchema({
        name_style: "Auditivo",
        description_style: "Learning style auditivo",
      }).save(),

      new LearningStyleSchema({
        name_style: "Visual",
        description_style: "Learning style visual",
      }).save(),

      new LearningStyleSchema({
        name_style: "Kinestesico",
        description_style: "Learning style kinestesico",
      }).save(),

      new LearningStyleSchema({
        name_style: "Lectoescritura",
        description_style: "Learning style lectoescritura",
      }).save(),

      
    ]);
  } catch (error) {
    errorResponse(500, "Error creating roles default", error.message);
  }
}

module.exports = createRole;
