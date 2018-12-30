# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class VariantsInner(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, id: str=None, chromosome: str=None, position: float=None, gnomad_af: float=None, gnomad_hf: float=None, gnomad_pop_filter: List[str]=None, filter: str=None, gene: List[str]=None, coding_or_splicing: bool=None, impact: str=None, consequence: str=None, cadd: float=None, number_of_hets_carriers: float=None, number_of_homs_carriers: float=None, hgvs: str=None):  # noqa: E501
        """VariantsInner - a model defined in Swagger

        :param id: The id of this VariantsInner.  # noqa: E501
        :type id: str
        :param chromosome: The chromosome of this VariantsInner.  # noqa: E501
        :type chromosome: str
        :param position: The position of this VariantsInner.  # noqa: E501
        :type position: float
        :param gnomad_af: The gnomad_af of this VariantsInner.  # noqa: E501
        :type gnomad_af: float
        :param gnomad_hf: The gnomad_hf of this VariantsInner.  # noqa: E501
        :type gnomad_hf: float
        :param gnomad_pop_filter: The gnomad_pop_filter of this VariantsInner.  # noqa: E501
        :type gnomad_pop_filter: List[str]
        :param filter: The filter of this VariantsInner.  # noqa: E501
        :type filter: str
        :param gene: The gene of this VariantsInner.  # noqa: E501
        :type gene: List[str]
        :param coding_or_splicing: The coding_or_splicing of this VariantsInner.  # noqa: E501
        :type coding_or_splicing: bool
        :param impact: The impact of this VariantsInner.  # noqa: E501
        :type impact: str
        :param consequence: The consequence of this VariantsInner.  # noqa: E501
        :type consequence: str
        :param cadd: The cadd of this VariantsInner.  # noqa: E501
        :type cadd: float
        :param number_of_hets_carriers: The number_of_hets_carriers of this VariantsInner.  # noqa: E501
        :type number_of_hets_carriers: float
        :param number_of_homs_carriers: The number_of_homs_carriers of this VariantsInner.  # noqa: E501
        :type number_of_homs_carriers: float
        :param hgvs: The hgvs of this VariantsInner.  # noqa: E501
        :type hgvs: str
        """
        self.swagger_types = {
            'id': str,
            'chromosome': str,
            'position': float,
            'gnomad_af': float,
            'gnomad_hf': float,
            'gnomad_pop_filter': List[str],
            'filter': str,
            'gene': List[str],
            'coding_or_splicing': bool,
            'impact': str,
            'consequence': str,
            'cadd': float,
            'number_of_hets_carriers': float,
            'number_of_homs_carriers': float,
            'hgvs': str
        }

        self.attribute_map = {
            'id': 'id',
            'chromosome': 'chromosome',
            'position': 'position',
            'gnomad_af': 'gnomad_af',
            'gnomad_hf': 'gnomad_hf',
            'gnomad_pop_filter': 'gnomad_pop_filter',
            'filter': 'filter',
            'gene': 'gene',
            'coding_or_splicing': 'codingOrSplicing',
            'impact': 'impact',
            'consequence': 'consequence',
            'cadd': 'cadd',
            'number_of_hets_carriers': 'numberOfHetsCarriers',
            'number_of_homs_carriers': 'numberOfHomsCarriers',
            'hgvs': 'hgvs'
        }

        self._id = id
        self._chromosome = chromosome
        self._position = position
        self._gnomad_af = gnomad_af
        self._gnomad_hf = gnomad_hf
        self._gnomad_pop_filter = gnomad_pop_filter
        self._filter = filter
        self._gene = gene
        self._coding_or_splicing = coding_or_splicing
        self._impact = impact
        self._consequence = consequence
        self._cadd = cadd
        self._number_of_hets_carriers = number_of_hets_carriers
        self._number_of_homs_carriers = number_of_homs_carriers
        self._hgvs = hgvs

    @classmethod
    def from_dict(cls, dikt) -> 'VariantsInner':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Variants_inner of this VariantsInner.  # noqa: E501
        :rtype: VariantsInner
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> str:
        """Gets the id of this VariantsInner.


        :return: The id of this VariantsInner.
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id: str):
        """Sets the id of this VariantsInner.


        :param id: The id of this VariantsInner.
        :type id: str
        """

        self._id = id

    @property
    def chromosome(self) -> str:
        """Gets the chromosome of this VariantsInner.


        :return: The chromosome of this VariantsInner.
        :rtype: str
        """
        return self._chromosome

    @chromosome.setter
    def chromosome(self, chromosome: str):
        """Sets the chromosome of this VariantsInner.


        :param chromosome: The chromosome of this VariantsInner.
        :type chromosome: str
        """

        self._chromosome = chromosome

    @property
    def position(self) -> float:
        """Gets the position of this VariantsInner.


        :return: The position of this VariantsInner.
        :rtype: float
        """
        return self._position

    @position.setter
    def position(self, position: float):
        """Sets the position of this VariantsInner.


        :param position: The position of this VariantsInner.
        :type position: float
        """

        self._position = position

    @property
    def gnomad_af(self) -> float:
        """Gets the gnomad_af of this VariantsInner.

        If it is not covered by gnomad, the value should be null. If it is covered, but not found, the value should be 0  # noqa: E501

        :return: The gnomad_af of this VariantsInner.
        :rtype: float
        """
        return self._gnomad_af

    @gnomad_af.setter
    def gnomad_af(self, gnomad_af: float):
        """Sets the gnomad_af of this VariantsInner.

        If it is not covered by gnomad, the value should be null. If it is covered, but not found, the value should be 0  # noqa: E501

        :param gnomad_af: The gnomad_af of this VariantsInner.
        :type gnomad_af: float
        """

        self._gnomad_af = gnomad_af

    @property
    def gnomad_hf(self) -> float:
        """Gets the gnomad_hf of this VariantsInner.


        :return: The gnomad_hf of this VariantsInner.
        :rtype: float
        """
        return self._gnomad_hf

    @gnomad_hf.setter
    def gnomad_hf(self, gnomad_hf: float):
        """Sets the gnomad_hf of this VariantsInner.


        :param gnomad_hf: The gnomad_hf of this VariantsInner.
        :type gnomad_hf: float
        """

        self._gnomad_hf = gnomad_hf

    @property
    def gnomad_pop_filter(self) -> List[str]:
        """Gets the gnomad_pop_filter of this VariantsInner.

        Populations that have far too many carriers than average. Used in Phenogenon  # noqa: E501

        :return: The gnomad_pop_filter of this VariantsInner.
        :rtype: List[str]
        """
        return self._gnomad_pop_filter

    @gnomad_pop_filter.setter
    def gnomad_pop_filter(self, gnomad_pop_filter: List[str]):
        """Sets the gnomad_pop_filter of this VariantsInner.

        Populations that have far too many carriers than average. Used in Phenogenon  # noqa: E501

        :param gnomad_pop_filter: The gnomad_pop_filter of this VariantsInner.
        :type gnomad_pop_filter: List[str]
        """

        self._gnomad_pop_filter = gnomad_pop_filter

    @property
    def filter(self) -> str:
        """Gets the filter of this VariantsInner.


        :return: The filter of this VariantsInner.
        :rtype: str
        """
        return self._filter

    @filter.setter
    def filter(self, filter: str):
        """Sets the filter of this VariantsInner.


        :param filter: The filter of this VariantsInner.
        :type filter: str
        """

        self._filter = filter

    @property
    def gene(self) -> List[str]:
        """Gets the gene of this VariantsInner.


        :return: The gene of this VariantsInner.
        :rtype: List[str]
        """
        return self._gene

    @gene.setter
    def gene(self, gene: List[str]):
        """Sets the gene of this VariantsInner.


        :param gene: The gene of this VariantsInner.
        :type gene: List[str]
        """

        self._gene = gene

    @property
    def coding_or_splicing(self) -> bool:
        """Gets the coding_or_splicing of this VariantsInner.


        :return: The coding_or_splicing of this VariantsInner.
        :rtype: bool
        """
        return self._coding_or_splicing

    @coding_or_splicing.setter
    def coding_or_splicing(self, coding_or_splicing: bool):
        """Sets the coding_or_splicing of this VariantsInner.


        :param coding_or_splicing: The coding_or_splicing of this VariantsInner.
        :type coding_or_splicing: bool
        """

        self._coding_or_splicing = coding_or_splicing

    @property
    def impact(self) -> str:
        """Gets the impact of this VariantsInner.


        :return: The impact of this VariantsInner.
        :rtype: str
        """
        return self._impact

    @impact.setter
    def impact(self, impact: str):
        """Sets the impact of this VariantsInner.


        :param impact: The impact of this VariantsInner.
        :type impact: str
        """

        self._impact = impact

    @property
    def consequence(self) -> str:
        """Gets the consequence of this VariantsInner.


        :return: The consequence of this VariantsInner.
        :rtype: str
        """
        return self._consequence

    @consequence.setter
    def consequence(self, consequence: str):
        """Sets the consequence of this VariantsInner.


        :param consequence: The consequence of this VariantsInner.
        :type consequence: str
        """

        self._consequence = consequence

    @property
    def cadd(self) -> float:
        """Gets the cadd of this VariantsInner.


        :return: The cadd of this VariantsInner.
        :rtype: float
        """
        return self._cadd

    @cadd.setter
    def cadd(self, cadd: float):
        """Sets the cadd of this VariantsInner.


        :param cadd: The cadd of this VariantsInner.
        :type cadd: float
        """

        self._cadd = cadd

    @property
    def number_of_hets_carriers(self) -> float:
        """Gets the number_of_hets_carriers of this VariantsInner.


        :return: The number_of_hets_carriers of this VariantsInner.
        :rtype: float
        """
        return self._number_of_hets_carriers

    @number_of_hets_carriers.setter
    def number_of_hets_carriers(self, number_of_hets_carriers: float):
        """Sets the number_of_hets_carriers of this VariantsInner.


        :param number_of_hets_carriers: The number_of_hets_carriers of this VariantsInner.
        :type number_of_hets_carriers: float
        """

        self._number_of_hets_carriers = number_of_hets_carriers

    @property
    def number_of_homs_carriers(self) -> float:
        """Gets the number_of_homs_carriers of this VariantsInner.


        :return: The number_of_homs_carriers of this VariantsInner.
        :rtype: float
        """
        return self._number_of_homs_carriers

    @number_of_homs_carriers.setter
    def number_of_homs_carriers(self, number_of_homs_carriers: float):
        """Sets the number_of_homs_carriers of this VariantsInner.


        :param number_of_homs_carriers: The number_of_homs_carriers of this VariantsInner.
        :type number_of_homs_carriers: float
        """

        self._number_of_homs_carriers = number_of_homs_carriers

    @property
    def hgvs(self) -> str:
        """Gets the hgvs of this VariantsInner.


        :return: The hgvs of this VariantsInner.
        :rtype: str
        """
        return self._hgvs

    @hgvs.setter
    def hgvs(self, hgvs: str):
        """Sets the hgvs of this VariantsInner.


        :param hgvs: The hgvs of this VariantsInner.
        :type hgvs: str
        """

        self._hgvs = hgvs