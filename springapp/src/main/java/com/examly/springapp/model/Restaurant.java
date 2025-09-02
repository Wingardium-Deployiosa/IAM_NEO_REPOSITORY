package com.examly.springapp.model;

 

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

import jakarta.persistence.Table;

import lombok.AllArgsConstructor;

import lombok.Builder;

import lombok.Data;

import lombok.NoArgsConstructor;

 

import java.time.LocalTime;

 

@Entity

@Table(name = "restaurants")

@Data

@NoArgsConstructor

@AllArgsConstructor

@Builder

public class Restaurant {

 

  @Id

  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

 

  private String name;

  private String address;

  private String cuisine;

  private LocalTime openingTime;

  private LocalTime closingTime;

  private int totalTables;

}