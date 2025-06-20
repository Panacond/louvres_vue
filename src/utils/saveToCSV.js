export function saveToCSVgrille(grille) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "height,width,quantity,color,mark\n" +
    grille
      .map(
        (detail) =>
          `${detail.height},${detail.width},${detail.quantity},"${detail.color}"`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "grille.csv");
  document.body.appendChild(link);
  link.click();
}

export function saveToCSVdetails(details) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "articul,name,units,quantity,color\n" +
    details
      .map(
        (detail) =>
          `"${detail.articul}","${detail.name}",${
            detail.length > 0 ? detail.length : 0
          },"${detail.units}",${detail.quantity},"${
            detail.color ? detail.color : ""
          }"`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "details.csv");
  document.body.appendChild(link);
  link.click();
}

export function saveToCSV_mat(material) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "articul,name,units,quantity,color\n" +
    material
      .map(
        (detail) =>
          `"${detail.articul}","${detail.name}","${detail.units}",${
            detail.quantity
          },"${detail.color ? detail.color : ""}`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "materials.csv");
  document.body.appendChild(link);
  link.click();
}

export function saveToCSVproducts(products) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "articul,name,units,quantity,mark,color,width,height,rigel,department\n" +
    products
      .map(
        (detail) =>
          `"${detail.articul}","${detail.name}","${detail.units}",${detail.quantity},"${detail.mark}","${detail.color}",${detail.width},${detail.height},"${detail.rigel}","${detail.department}"`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "list_lk.csv");
  document.body.appendChild(link);
  link.click();
}

export function saveToCSVworkshop(department) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "quantity,units,line,quan_line,articul,name,color,department\n" +
    department
      .map(
        (detail) =>
          `${detail.quantity},"${detail.units}","${detail.line}","${detail.quan_line}","${detail.articul}","${detail.name}","${detail.color}","${detail.department}"`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "department.csv");
  document.body.appendChild(link);
  link.click();
}
