export const getCatBirthYear = (birth) => {
    return Math.floor(new Date(birth).getFullYear());
}

export const getCatAge = (birth) => {
    return Math.floor((Date.now() - new Date(birth)) / (1000 * 60 * 60 * 24 * 365));
}

export const getLastDate = (dates) => {
    if (dates.length > 0) {
      const lastDate = dates.reduce((acc, curr) => {
        return new Date(acc.date) > new Date(curr.date) ? acc : curr;
      });
      return new Date(lastDate.date);
    }
}

export const getTimeUntilNextVacc = (vaccinations) => {
    if (!vaccinations || vaccinations.length === 0) return "";
   
    const lastVaccination = vaccinations.reduce((acc, curr) => {
      return new Date(acc.exp_date) > new Date(curr.exp_date) ? acc : curr;
    });
    const daysUntilNextVacc = (new Date(lastVaccination.exp_date) - Date.now()) / (1000 * 60 * 60 * 24);
    
    const days = Math.floor((daysUntilNextVacc % 365) % 30);
    const months = Math.floor((daysUntilNextVacc % 365) / 30)
    const years = Math.floor(daysUntilNextVacc / 365);

    if ((!days && !months && !years) || daysUntilNextVacc <= 0) return "Right meow! (ASAP)"

    return `${years ? years+" year(s) " : ""}${months ? months+" month(s) " : ""}${days ? days+" day(s)" : ""}`;
}   
  