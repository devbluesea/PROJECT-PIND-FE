import React, { useEffect, useState } from 'react';
import CardViewListItem from './CardViewListItem';
import './CardViewList.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SERVER_IP } from '../../constants/serverInfo';

const CardViewList = () => {
	const [projects, setProject] = useState(null);
	const selectedCategory = useSelector(state => state.category.selected);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${SERVER_IP}/project/list`);
				setProject(response.data.dtoList);
				const filteredProject = selectedCategory ?
							response.data.dtoList.filter(data => data.subject.subject1 === selectedCategory) : response.data.dtoList;
				setProject(filteredProject);
			}
			catch (e) { console.log(e); }
		};
		fetchData();
	}, [selectedCategory, projects]);

	if (!projects) {
		return (
			<div>Loading..</div>
		)
	}
	return (
		<div className="CardViewTemplate-wrapper">
			<div className="CardViewList-wrapper">
			{projects.map(project => (
				<CardViewListItem
				project = {project}
				key = {project.id}
				/>
			))}
			</div>
		</div>
	);
};

export default CardViewList;
