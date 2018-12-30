# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class GnomadFilters(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, genome: str=None, exome: str=None):  # noqa: E501
        """GnomadFilters - a model defined in Swagger

        :param genome: The genome of this GnomadFilters.  # noqa: E501
        :type genome: str
        :param exome: The exome of this GnomadFilters.  # noqa: E501
        :type exome: str
        """
        self.swagger_types = {
            'genome': str,
            'exome': str
        }

        self.attribute_map = {
            'genome': 'genome',
            'exome': 'exome'
        }

        self._genome = genome
        self._exome = exome

    @classmethod
    def from_dict(cls, dikt) -> 'GnomadFilters':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Gnomad_filters of this GnomadFilters.  # noqa: E501
        :rtype: GnomadFilters
        """
        return util.deserialize_model(dikt, cls)

    @property
    def genome(self) -> str:
        """Gets the genome of this GnomadFilters.


        :return: The genome of this GnomadFilters.
        :rtype: str
        """
        return self._genome

    @genome.setter
    def genome(self, genome: str):
        """Sets the genome of this GnomadFilters.


        :param genome: The genome of this GnomadFilters.
        :type genome: str
        """

        self._genome = genome

    @property
    def exome(self) -> str:
        """Gets the exome of this GnomadFilters.


        :return: The exome of this GnomadFilters.
        :rtype: str
        """
        return self._exome

    @exome.setter
    def exome(self, exome: str):
        """Sets the exome of this GnomadFilters.


        :param exome: The exome of this GnomadFilters.
        :type exome: str
        """

        self._exome = exome