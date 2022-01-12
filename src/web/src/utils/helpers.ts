export const helpers = {
  isNullUndefinedOrEmpty: (obj: any): boolean => {
    return obj === null || obj === undefined || obj === {} || obj === "";
  },
  uniqueId: (array: any[]) => {
    for (var i = 0; i < array.length; ++i) {
      for (var j = i + 1; j < array.length; ++j) {
        if (array[i]["id"] === array[j]["id"]) array.splice(j--, 1);
      }
    }

    return array;
  },
};
