import { getCatAge, getCatBirthYear } from "../../utils/CatData";

const CatProfileData = ({ catData }) => {
  return (
    <>
      <tr>
        <td>
          <b>Name:</b>
        </td>
        <td>{catData.name}</td>
      </tr>
      <tr>
        <td>
          <b> Birth year:</b>
        </td>
        <td>
          {getCatBirthYear(catData.birth)} ({getCatAge(catData.birth)} years
          old)
        </td>
      </tr>
      <tr>
        <td>
          <b>Breed:</b>
        </td>
        <td>{catData.breed}</td>
      </tr>
      <tr>
        <td>
          <b>Colour:</b>
        </td>
        <td>{catData.color}</td>
      </tr>
      <tr>
        <td>
          <b>Favourite toy:</b>
        </td>
        <td>{catData.fav_toy}</td>
      </tr>
    </>
  );
};

export default CatProfileData;
