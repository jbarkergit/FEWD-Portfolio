import Skills from '../../../assets/production-data/Skills';
import SkillButton from '../props/SkillButton';

type SkillsValuesType = {
  [key: string]: string;
};

const AboutDeveloperDialog = () => {
  return (
    <section className="dialog__modal__about">
      <p>I'm a React Front-End Developer.</p>
      {/* {Skills.map((skill: SkillsValuesType) => {
        <SkillButton key={skill.id} />;
      })} */}
    </section>
  );
};
export default AboutDeveloperDialog;
