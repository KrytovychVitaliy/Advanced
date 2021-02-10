'use strict'
import {goods} from './goods.js';

export const strUpper = str => str.replace(str[0], str[0].toUpperCase()); //перша буква велика

export const totalSum = () => Object.values(goods) //загальна вартість всіх товарів на залишку
                        .reduce(((accumulator, cur) => accumulator + cur.count * cur.price), 0);

export const elemCount = elem => goods[elem].count; //кількість залишку певного товару

export const calculation = obj => Object.values(obj) //віднімання проданої кількості товарів від залишків товарів
                                    .forEach(element => goods[element.name.toLowerCase()].count -= element.count);