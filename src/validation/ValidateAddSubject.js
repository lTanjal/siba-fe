import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  vF_regName,
  vF_regNumberCountPlus,
  vF_regNumberDecimalOnePlus,
  vF_regTimeLengthHoursAndMinutes,
} from "./Validate_GenericRegexps";

export async function validate(values, allocRoundId) {
  const errors = {};

  let subjectList = [];

  const getSubjectNames = async function (allocRoundId) {
    const { httpStatus, data } = await dao.fetchSubjectNames(allocRoundId);
    if (httpStatus === 200) {
      subjectList = data;
      // Here it is considered that the user does not enter
      // the name of an already existing lesson.
      const result = subjectList.some(
        (names) => names.name.toLowerCase() === values.name.toLowerCase(),
      );
      return result;
    } else {
      Logger.error(`getSubjectNames failed, http status code: ${httpStatus}`);
    }
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getSubjectNames(allocRoundId)) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }
  if (!values.groupSize) {
    errors.groupSize = requiredFieldErrorMessageFunction("Group size");
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Group size cannot be 0";
  } else if (!vF_regNumberCountPlus.regExp.test(values.groupSize)) {
    errors.groupSize = "Only numbers allowed";
  }

  if (!values.groupCount) {
    errors.groupCount = requiredFieldErrorMessageFunction("Group count");
  } else if (values.groupCount <= 0) {
    errors.groupCount = "The number of groups cannot be 0";
  } else if (!vF_regNumberCountPlus.regExp.test(values.groupCount)) {
    errors.groupCount = "Only numbers allowed";
  }

  if (!values.sessionLength) {
    errors.sessionLength = requiredFieldErrorMessageFunction("Session length");
  } else if (
    !vF_regTimeLengthHoursAndMinutes.regExp.test(values.sessionLength)
  ) {
    errors.sessionLength =
      vF_regTimeLengthHoursAndMinutes.errorMessageFunction("Session length");
  }

  if (!values.sessionCount) {
    errors.sessionCount = requiredFieldErrorMessageFunction("Session count");
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "The number of sessions per week cannot be 0";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(values.sessionCount)) {
    errors.sessionCount = "Only numbers allowed";
  }

  if (!values.area) {
    errors.area = requiredFieldErrorMessageFunction("Area");
  } else if (values.area <= 0) {
    errors.area = "The required area cannot be 0";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(values.area)) {
    errors.area = "Only numbers and . allowed. Give value from 0.1 to 9999.9 ";
  }

  if (!values.programId) {
    errors.programId = requiredFieldErrorMessageFunction("Program");
  }
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
