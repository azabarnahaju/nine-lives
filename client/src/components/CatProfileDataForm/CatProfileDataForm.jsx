import { getCatBirthYear } from "../../utils/CatData";

const CatProfileDataForm = ({ catData, handleInfoChange }) => {
  return (
    <>
      <tr>
        <td>
          <b>Name:</b>
        </td>
        <td>
          <input
            defaultValue={catData.name}
            key="name"
            id="name"
            onChange={handleInfoChange}
          />
        </td>
      </tr>
      <tr>
        <td>
          <b> Birth year:</b>
        </td>
        <td>
          <input
            defaultValue={getCatBirthYear(catData.birth)}
            key="birth"
            id="birth"
            onChange={handleInfoChange}
          />
        </td>
      </tr>
      <tr>
        <td>
          <b>Breed:</b>
        </td>
        <td>
          <input
            value={catData.breed}
            key="breed"
            id="breed"
            onChange={handleInfoChange}
          />
        </td>
      </tr>
      <tr>
        <td>
          <b>Colour:</b>
        </td>
        <td>
          <input
            value={catData.color}
            key="color"
            id="color"
            onChange={handleInfoChange}
          />
        </td>
      </tr>
      <tr>
        <td>
          <b>Favourite toy:</b>
        </td>
        <td>
          <input
            value={catData.fav_toy}
            key="fav_toy"
            id="fav_toy"
            onChange={handleInfoChange}
          />
        </td>
      </tr>
    </>
  );
};

export default CatProfileDataForm;
