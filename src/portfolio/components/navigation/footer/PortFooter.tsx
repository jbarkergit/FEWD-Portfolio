import { useEffect, useReducer, useRef } from 'react';
import ProjectNavProps from './ProjectNavProps';

type initStateType = {
  mouseDown: boolean;
  initX: number;
  trackPos: number;
  clientX: number;
  curTarget: HTMLElement | null;
  style: React.CSSProperties;
};

const initState: initStateType = {
  mouseDown: false,
  initX: 0,
  trackPos: 0,
  clientX: 0,
  curTarget: null,
  style: { transform: `translateX(0px)` },
};

const PortFooter = (): JSX.Element => {
  return (
    <footer className="portFooter">
      <nav className="portFooter__nav">
        <ProjectNavProps
          linkTo="/ecommerce"
          imgSrc="src\ecommerce\assets\production-images\compressed-home-page\infographic\img-by-ilias-chebbi-on-unsplash.jpg"
          projectName="Dynamic Audio"
          projectType="Ecommerce"
        />
        <ProjectNavProps
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProps
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProps
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProps
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProps
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
      </nav>
    </footer>
  );
};

export default PortFooter;
